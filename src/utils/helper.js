const axios = require('axios');
const cryptojs = require('crypto-js');

const { AUTH_SERVICE_URL_DEV, AUTH_SERVICE_URL_PROD } = require('../config');
const { INCORRECT_PASSWORD, INVALID_ENV } = require('../constants/responses');

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
    return { error };
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

async function getEncryptedPKey({ password, authToken, env }) {
  const { error: VALIDATE_PASSWORD_ERROR } = await validatePassword({ password, authToken, env });

  if (VALIDATE_PASSWORD_ERROR) {
    return { error: VALIDATE_PASSWORD_ERROR };
  }

  const { error: GET_ACCESS_TOKEN_ERROR, response: accessToken } = await generateToken({
    params: { password },
    authToken,
    scope: 'transaction',
    env,
  });

  if (GET_ACCESS_TOKEN_ERROR) {
    return { error: GET_ACCESS_TOKEN_ERROR };
  }

  const { response: AUTH_SERVICE_URL, error: ENV_ERROR } = await getBaseURL(env);

  if (ENV_ERROR) {
    return { error: ENV_ERROR };
  }

  const url = `${AUTH_SERVICE_URL}/auth/private-key`;

  const { data, error: GET_ENCRYPTED_PRIVATE_KEY } = await getRequest({
    url,
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

module.exports = {
  postRequest, getEncryptedPKey, decryptKey, getBaseURL,
};
