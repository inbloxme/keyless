import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

import { hideLoader } from '../../utils/ui-helper';

export function validateOldPasswordModal() {
  return `
  <div class="widget-modal-content active" id="validate-old-password">
    ${loader()}
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
        <h1>
          Change Password
        </h1>
    </div>
    <div class="widget-modal-form">
      <div class="widget-modal-input">
        <label>Old Password <sup>*</sup></label>
        <input type="password" id="old-password">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
      </div>
    </div>
    <div class="widget-modal-button">
      <button id="validate-old-password-button">
        Validate Password
      </button>
    </div>
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://inblox.me/">
          ${inbloxMe}
        </a>
      </p>
    </div>
  </div>`;
}

// Validate old password helper method.
export async function validateOldPassword(keylessInstance) {
  const oldPassword = document.getElementById('old-password').value;
  const validateResponse = await keylessInstance.validatePasswordAndGetPKey({
    password: oldPassword
  });

  if (validateResponse.error) {
    hideLoader();
    document.getElementById('error-message').innerHTML = validateResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return { status: false };
  } else {
    document.getElementById('error-message').style.display = 'none';
    return {
      status: true,
      privateKey: validateResponse.response,
      oldPassword: oldPassword
    };
  }
}
