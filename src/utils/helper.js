const axios = require('axios');
const cryptojs = require('crypto-js');

const { AUTH_SERVICE_URL } = require('../config');
const { WRONG_PASSWORD } = require('../constants/responses');
const { importFromEncryptedJson, importFromMnemonic, importFromPrivateKey } = require('../index');

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

async function validatePassword({ password, authToken }) {
  const url = `${AUTH_SERVICE_URL}/auth/authenticate-password`;
  const { response, error } = await postRequest({ params: { password }, url, authToken });

  if (error) {
    return { error: error.data };
  }

  return { response };
}

async function generateToken({ params, authToken, scope }) {
  try {
    const response = await axios({
      url: `${AUTH_SERVICE_URL}/auth/generate-token/?scope=${scope}`,
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

async function updatePasswordAndPrivateKey({ password, encryptedPrivateKey, authToken }) {
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
    const { response, error } = await importFromPrivateKey(privateKey);

    if (error) {
      return { error };
    }

    return { response: { publicAddress: response.publicAddress, privateKey: response.privateKey } };
  }

  if (seedPhrase) {
    const { error, response } = await importFromMnemonic(seedPhrase);

    if (error) {
      return { error };
    }

    return { response: response.wallet };
  }

  const { error, response } = await importFromEncryptedJson(encryptedJson, password);

  if (error) {
    return { error };
  }

  return { response: response.wallet };
}

async function verifyPublicAddress({ address, authToken }) {
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
};
