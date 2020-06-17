/* eslint-disable class-methods-use-this */
const ethers = require('ethers');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

const { DEFAULT_GAS_LIMIT } = require('./config');
const {
  postRequest, getEncryptedPKey, decryptKey, getBaseURL,
} = require('./utils/helper');
const {
  TRANSACTION_ERROR, WRONG_PASSWORD, INVALID_MNEMONIC, INVALID_PRIVATE_KEY,
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
    const { address } = new ethers.utils.SigningKey(privateKey);

    return { response: { publicAddress: address, privateKey } };
  } catch (error) {
    return { error: INVALID_PRIVATE_KEY };
  }
}

class Keyless {
  constructor({
    apiKey, apiSecret, infuraKey, env,
  }) {
    this.authToken = '';
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.infuraKey = infuraKey;
    this.env = env;
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${this.infuraKey}`));
  }

  async getUser({ userName, password }) {
    const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(this.env);

    if (ENV_ERROR) {
      return { error: ENV_ERROR };
    }

    const url = `${AUTH_SERVICE_URL}/auth/keyless-login`;
    const params = { userName, password };

    const { error, response } = await postRequest({ url, params });

    if (error) {
      return { error };
    }

    const { data: { token } } = response;

    this.authToken = token;

    return { response: token };
  }

  async signTransaction({
    to, value, gasPrice, gasLimit, data, nonce, password,
  }) {
    const { error: ENCRYPTED_PKEY_ERROR, response: encryptedPrivateKey } = await getEncryptedPKey({ password, authToken: this.authToken, env: this.env });

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
}

module.exports = {
  Keyless, importFromEncryptedJson, importFromMnemonic, importFromPrivateKey,
};
