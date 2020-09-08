/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const ethers = require('ethers');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3');

const { Widget } = require('./widget');

const { DEFAULT_GAS_LIMIT, IP_INFO_API } = require('./config');
const {
  postRequest,
  getReq,
  encryptKey,
  decryptKey,
  updatePasswordAndPrivateKey,
  extractPrivateKey,
  verifyPublicAddress,
  validatePassword,
  generateToken,
  getRequestWithAccessToken,
  getBaseURL,
} = require('./utils/helper');
const {
  INSUFFICIENT_FUNDS, INVALID_PRIVATE_KEY, WRONG_PASSWORD, INVALID_MNEMONIC, PASSWORD_MATCH_ERROR, PASSWORD_CHANGE_SUCCESS,
} = require('./constants/responses');

class Wallet {
  async createWallet() {
    const wallet = ethers.Wallet.createRandom();

    return {
      response: { publicAddress: wallet.address, privateKey: wallet.privateKey, mnemonic: wallet.mnemonic },
    };
  }

  async importFromEncryptedJson(jsonData, password) {
    const json = JSON.stringify(jsonData);

    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(json, password);

      return {
        response: { publicAddress: wallet.address, privateKey: wallet.privateKey },
      };
    } catch (error) {
      return { error: WRONG_PASSWORD };
    }
  }

  async importFromMnemonic(mnemonic) {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);

      return {
        response: { publicAddress: wallet.address, privateKey: wallet.privateKey },
      };
    } catch (error) {
      return { error: INVALID_MNEMONIC };
    }
  }

  async importFromPrivateKey(privateKey) {
    try {
      const ec = new EC('secp256k1');

      const key = ec.keyFromPrivate(privateKey, 'hex');

      const publicKey = key.getPublic().encode('hex').slice(2);

      const address = keccak256(Buffer.from(publicKey, 'hex')).slice(64 - 40).toString();

      const checksumAddress = await Web3.utils.toChecksumAddress(`0x${address}`);

      return { response: { publicAddress: checksumAddress, privateKey } };
    } catch (error) {
      return { error: INVALID_PRIVATE_KEY };
    }
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
      const { data: { details } } = error;

      return { error: details[0].message };
    }

    const { data } = response;

    this.authToken = data.token;

    return { response: data };
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

  // eslint-disable-next-line consistent-return
  async sendTx({ signedTx }) {
    try {
      const response = await this.web3.eth.sendSignedTransaction(signedTx);

      const { error: IP_ERROR, response: IP_DATA } = await getReq({ url: IP_INFO_API });

      const {
        ip, loc, country, region, city,
      } = IP_DATA;

      if (IP_ERROR) {
        return { error: IP_ERROR };
      }

      const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(this.env);

      if (ENV_ERROR) {
        return { error: ENV_ERROR };
      }

      const { error: TRANSACTION_LOG_ERROR } = await postRequest({
        url: `${AUTH_SERVICE_URL}/auth/transaction-logs`,
        authToken: this.authToken,
        params: {
          transactionHash: response.transactionHash, ipAddress: ip, location: loc, country, region, city,
        },
      });

      if (TRANSACTION_LOG_ERROR) {
        return { error: TRANSACTION_LOG_ERROR };
      }

      return { response: { transactionHash: response.transactionHash } };
    } catch (error) {
      if (error.message === 'Returned error: insufficient funds for gas * price + value') {
        return { error: INSUFFICIENT_FUNDS };
      }
    }
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
    const { error: VALIDATE_PASSWORD_ERROR } = await validatePassword({ password, authToken: this.authToken, env: this.env });

    if (VALIDATE_PASSWORD_ERROR) {
      return { error: WRONG_PASSWORD };
    }

    const { error: GET_ACCESS_TOKEN_ERROR, response: accessToken } = await generateToken({
      params: { password },
      authToken: this.authToken,
      scope: 'transaction',
      env: this.env,
    });

    if (GET_ACCESS_TOKEN_ERROR) {
      return { error: GET_ACCESS_TOKEN_ERROR };
    }

    const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(this.env);

    if (ENV_ERROR) {
      return { error: ENV_ERROR };
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
      env: this.env,
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

    const { error: VERIFY_PUBLIC_ADDRESS_ERROR } = await verifyPublicAddress({ address: response.publicAddress, authToken: this.authToken, env: this.env });

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

  async convertToEth({ srcUnit, amount }) {
    if (srcUnit === 'wei') {
      const etherValue = Web3.utils.fromWei(amount, 'ether');

      return etherValue;
    }
    if (srcUnit === 'gwei') {
      const weiValue = this.web3.utils.toWei(amount, 'gwei');
      const etherValue = this.web3.utils.fromWei(weiValue, 'ether');

      return etherValue;
    }

    return 'Invalid Source Unit';
  }
}

module.exports.Keyless = Keyless;
module.exports.Wallet = Wallet;
module.exports.Widget = Widget;
