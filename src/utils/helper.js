const axios = require('axios');
const cryptojs = require('crypto-js');

const { AUTH_SERVICE_URL_DEV, AUTH_SERVICE_URL_PROD } = require('../config');
const {
  WRONG_PASSWORD, INVALID_ENV,
} = require('../constants/responses');

const Instance = require('../index');

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

async function getReq({ url }) {
  try {
    const response = await axios({
      url,
      method: 'GET',
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
  const url = `${AUTH_SERVICE_URL}/auth/update-password-pkey`;
  const { response, error } = await postRequest({ params: { password, encryptedPrivateKey }, url, authToken });

  if (error) {
    return { error };
  }

  return { response };
}

async function extractPrivateKey({
  privateKey, seedPhrase, encryptedJson, password,
}) {
  const wallet = new Instance.Wallet();

  if (privateKey) {
    const { error: PRIVATE_KEY_ERROR, response } = await wallet.importFromPrivateKey(privateKey);

    if (PRIVATE_KEY_ERROR) {
      return { error: PRIVATE_KEY_ERROR };
    }

    return { response };
  }

  if (seedPhrase) {
    const { error: MNEMONIC_ERROR, response } = await wallet.importFromMnemonic(seedPhrase);

    if (MNEMONIC_ERROR) {
      return { error: MNEMONIC_ERROR };
    }

    return { response };
  }

  const { error: KEYSTORE_ERROR, response } = await wallet.importFromEncryptedJson(encryptedJson, password);

  if (KEYSTORE_ERROR) {
    return { error: KEYSTORE_ERROR };
  }

  return { response };
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
};
