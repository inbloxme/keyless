/* eslint-disable class-methods-use-this */
const ethers = require('ethers');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const { AUTH_SERVICE_URL, DEFAULT_GAS_LIMIT } = require('./config');
const {
  postRequest,
  encryptKey,
  decryptKey,
  updatePasswordAndPrivateKey,
  extractPrivateKey,
  verifyPublicAddress,
  validatePassword,
  generateToken,
  getRequestWithAccessToken,
} = require('./utils/helper');
const {
  TRANSACTION_ERROR, INVALID_PRIVATE_KEY, WRONG_PASSWORD, INVALID_MNEMONIC, PASSWORD_MATCH_ERROR, PASSWORD_CHANGE_SUCCESS,
} = require('./constants/responses');

async function importFromEncryptedJson(jsonData, password) {
  const json = JSON.stringify(jsonData);

  try {
    const wallet = await ethers.Wallet.fromEncryptedJson(json, password);

    return {
      response: wallet,
    };
  } catch (error) {
    return { error: WRONG_PASSWORD };
  }
}

async function importFromMnemonic(mnemonic) {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    return {
      response: wallet,
    };
  } catch (error) {
    return { error: INVALID_MNEMONIC };
  }
}

async function importFromPrivateKey(privateKey) {
  try {
    const wallet = new ethers.utils.SigningKey(privateKey);

    return { response: { wallet } };
  } catch (error) {
    return { error: INVALID_PRIVATE_KEY };
  }
}

class Keyless {
  constructor({ apiKey, apiSecret, infuraKey }) {
    this.authToken = '';
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.infuraKey = infuraKey;
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${this.infuraKey}`));
  }

  async getUser({ userName, password }) {
    const url = `${AUTH_SERVICE_URL}/auth/keyless-login`;
    const params = { userName, password };

    const { error, response } = await postRequest({ url, params });

    if (error) {
      return { error: WRONG_PASSWORD };
    }

    const { data: { token } } = response;

    this.authToken = token;

    return { response: token };
  }

  async signTransaction({
    to, value, gasPrice, gasLimit, data, nonce, password,
  }) {
    const { error: ENCRYPTED_PKEY_ERROR, response: encryptedPrivateKey } = await this.validatePasswordAndGetPKey({ password, authToken: this.authToken });

    if (ENCRYPTED_PKEY_ERROR) {
      return { error: ENCRYPTED_PKEY_ERROR };
    }

    const { error: DECRYPT_KEY_ERROR, response: privateKey } = await decryptKey({ encryptedPrivateKey, password });

    if (DECRYPT_KEY_ERROR) {
      return { error: DECRYPT_KEY_ERROR };
    }

    const pKey = privateKey.slice(2);
    const accountObject = this.web3.eth.accounts.privateKeyToAccount(pKey);

    const defaultGasPrice = await this.web3.eth.getGasPrice();

    const count = await this.web3.eth.getTransactionCount(accountObject.address);

    const defaultNonce = await this.web3.utils.toHex(count);

    const rawTx = {
      to,
      from: accountObject.address,
      value: this.web3.utils.toHex(value),
      gasPrice: this.web3.utils.toHex(gasPrice) || this.web3.utils.toHex(defaultGasPrice),
      gas: this.web3.utils.numberToHex(gasLimit) || this.web3.utils.numberToHex(DEFAULT_GAS_LIMIT),
      data: data || '0x00',
      nonce: nonce || defaultNonce,
      chainId: 3,
    };

    const pkey = Buffer.from(pKey, 'hex');
    const tx = new Tx(rawTx, { chain: 'ropsten', hardfork: 'petersburg' });

    tx.sign(pkey);
    const signedTx = `0x${tx.serialize().toString('hex')}`;

    return { response: signedTx };
  }

  async sendTx({ signedTx }) {
    const response = await this.web3.eth.sendSignedTransaction(signedTx);

    if (response) {
      return { response: { transactionHash: response.transactionHash } };
    }

    return { error: TRANSACTION_ERROR };
  }

  async signAndSendTx({
    to, value, gasPrice, gasLimit, data, nonce, password,
  }) {
    const { error: SIGN_ERROR, response: signedTx } = await this.signTransaction({
      to, value, gasPrice, gasLimit, data, nonce, password,
    });

    if (SIGN_ERROR) {
      return { error: SIGN_ERROR };
    }

    const { error: SEND_TX_ERROR, response } = await this.sendTx({ signedTx });

    if (SEND_TX_ERROR) {
      return { error: SEND_TX_ERROR };
    }

    return { response: { transactionHash: response.transactionHash } };
  }

  async validatePasswordAndGetPKey({ password }) {
    const { error: VALIDATE_PASSWORD_ERROR } = await validatePassword({ password, authToken: this.authToken });

    if (VALIDATE_PASSWORD_ERROR) {
      return { error: WRONG_PASSWORD };
    }

    const { error: GET_ACCESS_TOKEN_ERROR, response: accessToken } = await generateToken({
      params: { password },
      authToken: this.authToken,
      scope: 'transaction',
    });

    if (GET_ACCESS_TOKEN_ERROR) {
      return { error: GET_ACCESS_TOKEN_ERROR };
    }

    const { response, error: GET_ENCRYPTED_PRIVATE_KEY } = await getRequestWithAccessToken({
      url: `${AUTH_SERVICE_URL}/auth/private-key`,
      authToken: this.authToken,
      accessToken,
    });

    if (response) {
      return { response: response.data.encryptedPrivateKey };
    }

    return { error: GET_ENCRYPTED_PRIVATE_KEY };
  }

  async changePassword({
    encryptedPrivateKey, oldPassword, newPassword, confirmPassword,
  }) {
    if (newPassword !== confirmPassword) {
      return { error: PASSWORD_MATCH_ERROR };
    }

    const { error: DECRYPT_KEY_ERROR, response: privateKey } = await decryptKey({ encryptedPrivateKey, password: oldPassword });

    if (DECRYPT_KEY_ERROR) {
      return { error: DECRYPT_KEY_ERROR };
    }

    const { response: newEncryptedPrivateKey } = await encryptKey({ privateKey, password: newPassword });

    const { error: UPDATE_PASSWORD_ERROR } = await updatePasswordAndPrivateKey({
      password: newPassword,
      encryptedPrivateKey: newEncryptedPrivateKey,
      authToken: this.authToken,
    });

    if (UPDATE_PASSWORD_ERROR) {
      return { error: UPDATE_PASSWORD_ERROR };
    }

    return { response: PASSWORD_CHANGE_SUCCESS };
  }

  async resetPassword({
    privateKey, seedPhrase, encryptedJson, walletPassword, newPassword,
  }) {
    const { error: PRIVATE_KEY_ERROR, response } = await extractPrivateKey({
      privateKey, seedPhrase, encryptedJson, password: walletPassword,
    });

    if (PRIVATE_KEY_ERROR) {
      return { error: PRIVATE_KEY_ERROR };
    }

    const { error: VERIFY_PUBLIC_ADDRESS_ERROR } = await verifyPublicAddress({ address: response.publicAddress, authToken: this.authToken });

    if (VERIFY_PUBLIC_ADDRESS_ERROR) {
      return { error: VERIFY_PUBLIC_ADDRESS_ERROR };
    }

    const { response: newEncryptedPrivateKey } = await encryptKey({ privateKey, password: newPassword });

    const { error: UPDATE_PASSWORD_ERROR } = await updatePasswordAndPrivateKey({
      password: newPassword,
      encryptedPrivateKey: newEncryptedPrivateKey,
      authToken: this.authToken,
    });

    if (UPDATE_PASSWORD_ERROR) {
      return { error: UPDATE_PASSWORD_ERROR };
    }

    return { response: PASSWORD_CHANGE_SUCCESS };
  }
}

module.exports = {
  Keyless, importFromEncryptedJson, importFromMnemonic, importFromPrivateKey,
};
