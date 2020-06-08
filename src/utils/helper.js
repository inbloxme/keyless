const axios = require('axios');
const cryptojs = require('crypto-js');

const { AUTH_SERVICE_URL } = require('../config');
const { INCORRECT_PASSWORD } = require('../constants/responses');

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
    return { error };
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
    return { error: error.response.data.details[0] };
  }
}

async function getRequest({ url, authToken, accessToken }) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        accessToken,
      },
    });

    return response;
  } catch (error) {
    return { error };
  }
}

async function getEncryptedPKey({ password, authToken }) {
  const { error: VALIDATE_PASSWORD_ERROR } = await validatePassword({ password, authToken });

  if (VALIDATE_PASSWORD_ERROR) {
    return { error: VALIDATE_PASSWORD_ERROR };
  }

  const { error: GET_ACCESS_TOKEN_ERROR, response: accessToken } = await generateToken({
    params: { password },
    authToken,
    scope: 'transaction',
  });

  if (GET_ACCESS_TOKEN_ERROR) {
    return { error: GET_ACCESS_TOKEN_ERROR };
  }

  const { data, error: GET_ENCRYPTED_PRIVATE_KEY } = await getRequest({
    url: `${AUTH_SERVICE_URL}/auth/private-key`,
    authToken,
    accessToken,
  });

  if (data) {
    return { response: data.data.encryptedPrivateKey };
  }

  return { error: GET_ENCRYPTED_PRIVATE_KEY };
}

async function decryptKey({ encryptedPrivateKey, password }) {
  const bytes = await cryptojs.AES.decrypt(encryptedPrivateKey, password);
  const privateKey = bytes.toString(cryptojs.enc.Utf8);

  if (privateKey === '') {
    return { error: INCORRECT_PASSWORD };
  }

  return { response: privateKey };
}

module.exports = { postRequest, getEncryptedPKey, decryptKey };
