const axios = require('axios');
const cryptojs = require('crypto-js');
const ethers = require('ethers');
const Web3 = require('web3');
const EC = require('elliptic').ec;
const { keccak256 } = require('js-sha3');

const { AUTH_SERVICE_URL_DEV, AUTH_SERVICE_URL_PROD } = require('../config');
const {
  WRONG_PASSWORD, INVALID_ENV, INVALID_MNEMONIC, INVALID_PRIVATE_KEY,
} = require('../constants/responses');

async function getBaseURL(env) {
  if (env === 'dev') {
    return { response: AUTH_SERVICE_URL_DEV };
  } if (env === undefined || env === 'prod') {
    return { response: AUTH_SERVICE_URL_PROD };
  }

  return { error: INVALID_ENV };
}

async function postRequest({ params, url, authToken }) {
  try {
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: params,
    });

    return { response: response.data };
  } catch (error) {
    return { error: error.response };
  }
}

async function validatePassword({ password, authToken, env }) {
  const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(env);

  if (ENV_ERROR) {
    return { error: ENV_ERROR };
  }

  const url = `${AUTH_SERVICE_URL}/auth/authenticate-password`;
  const { response, error } = await postRequest({ params: { password }, url, authToken });

  if (error) {
    return { error: error.data };
  }

  return { response };
}

async function generateToken({
  params, authToken, scope, env,
}) {
  try {
    const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(env);

    if (ENV_ERROR) {
      return { error: ENV_ERROR };
    }

    const url = `${AUTH_SERVICE_URL}/auth/generate-token/?scope=${scope}`;

    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: params,
    });

    return { response: response.data.data };
  } catch (error) {
    return { error: error.response.data.details };
  }
}

async function getRequestWithAccessToken({ url, authToken, accessToken }) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        accessToken,
      },
    });

    return { response: response.data };
  } catch (error) {
    return { error };
  }
}

async function getRequest({ url, authToken }) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return { response: response.data };
  } catch (error) {
    return { error };
  }
}

async function encryptKey({ privateKey, password }) {
  const encryptedPrivateKey = cryptojs.AES.encrypt(privateKey, password);
  const encryptedPrivateKeyString = encryptedPrivateKey.toString();

  return { response: encryptedPrivateKeyString };
}

async function decryptKey({ encryptedPrivateKey, password }) {
  const bytes = await cryptojs.AES.decrypt(encryptedPrivateKey, password);
  const privateKey = bytes.toString(cryptojs.enc.Utf8);

  if (privateKey === '') {
    return { error: WRONG_PASSWORD };
  }

  return { response: privateKey };
}

async function updatePasswordAndPrivateKey({
  password, encryptedPrivateKey, authToken, env,
}) {
  const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(env);

  if (ENV_ERROR) {
    return { error: ENV_ERROR };
  }
  const url = `${AUTH_SERVICE_URL}/auth/update-credentials`;
  const { response, error } = await postRequest({ params: { password, encryptedPrivateKey }, url, authToken });

  if (error) {
    return { error };
  }

  return { response };
}

async function extractPrivateKey({
  privateKey, seedPhrase, encryptedJson, password,
}) {
  if (privateKey) {
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

  if (seedPhrase) {
    try {
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
      const { privateKey: pkey, address } = wallet;

      return {
        response: {
          publicAddress: address, privateKey: pkey,
        },
      };
    } catch (error) {
      return { error: INVALID_MNEMONIC };
    }
  }

  const json = JSON.stringify(encryptedJson);

  try {
    const wallet = ethers.Wallet.fromEncryptedJson(json, password);

    const { address, privateKey: pKey } = wallet;

    return {
      response: { publicAddress: address, privateKey: pKey },
    };
  } catch (error) {
    return { error: WRONG_PASSWORD };
  }
}

async function verifyPublicAddress({ address, authToken, env }) {
  const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(env);

  if (ENV_ERROR) {
    return { error: ENV_ERROR };
  }

  const url = `${AUTH_SERVICE_URL}/auth/public-address/${address}`;

  const { error, data } = await getRequest({ url, authToken });

  if (error) {
    return { error: error.response.data.details };
  }

  return { response: data };
}

module.exports = {
  postRequest,
  encryptKey,
  decryptKey,
  updatePasswordAndPrivateKey,
  extractPrivateKey,
  verifyPublicAddress,
  validatePassword,
  generateToken,
  getRequestWithAccessToken,
  getBaseURL,
};
