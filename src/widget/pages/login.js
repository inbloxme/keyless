import { safleWidgetIcon, closeIcon, safleLogo } from '../assets/images';

import { loader } from './loaders/loader';

import { hideLoader } from '../utils';

export function loginModal() {
  return `
  <div class="widget-modal-content active" id="login">
    ${loader()}
    <!-- Header -->
    <div class="widget-modal-header">
      ${safleWidgetIcon}
      <h1>
        Login
      </h1>
    </div>
    <!-- Form -->
    <div class="widget-modal-form">
      <div class="widget-modal-input">
        <label>Your safle ID / Email <sup>*</sup></label>
        <input type="text" name="username or email" autocomplete="off" id="widget-user-email">
      </div>
      <div class="widget-modal-input">
        <label>Password <sup>*</sup></label>
        <input type="password" name="password" autocomplete="off" id="widget-user-password">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
      </div>
    </div>
    <!-- Button -->
    <div class="widget-modal-button">
      <button id="login-button">
        Login
      </button>
    </div>
    <!-- Links -->
    <div class="widget-modal-link">
      <p>Don’t have an account? <a href="https://test-app.getsafle.com/register" target="_blank">Sign Up here</a></p>
    </div>
    <!-- Footer -->
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://getsafle.com/" target="_blank">
          ${safleLogo}
        </a>
      </p>
    </div>

    <div class="close-button">
      <button id="close-icon" type="button">
        ${closeIcon}
      </button>
    </div>
  </div>`;
}

// Login helper method.
export async function login(keylessInstance) {
  const userEmail = document.getElementById('widget-user-email').value;
  const userPassword = document.getElementById('widget-user-password').value;

  const userDetails = {
    userName: userEmail,
    password: userPassword,
  };

  // Using Keyless instance methods.
  const loginResponse = await keylessInstance.getUser(userDetails);

  hideLoader();
  if (loginResponse.error) {

    document.getElementById('error-message').innerHTML = loginResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return { status: false };
  } else if (loginResponse.response) {
    document.getElementById('error-message').style.display = 'none';
    return { status: true, data: loginResponse.response };
  }
}
