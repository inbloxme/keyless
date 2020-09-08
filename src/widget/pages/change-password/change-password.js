import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

import { hideLoader } from '../../utils/ui-helper';

export function changePasswordModal() {
  return `
  <div class="widget-modal-content active" id="change-password">
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
        <input type="password" id="chg-pwd-old-password">
      </div>
      <div class="widget-modal-input">
        <label>New password <sup>*</sup></label>
        <input type="password" id="chg-pwd-new-password">
      </div>
      <div class="widget-modal-input">
        <label>Confirm New password <sup>*</sup></label>
        <input type="password" id="chg-pwd-confirm-password">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
      </div>
    </div>
    <div class="widget-modal-button">
      <button id="submit-changed-password">
        Change Password
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

// Change password helper method.
export async function changePasswordWithPrivateKey(
  keylessInstance,
  privateKey,
  oldPassword
) {
  const newPassword = document.getElementById('chg-pwd-new-password').value;
  const confirmPassword = document.getElementById('chg-pwd-confirm-password')
    .value;

  document.getElementById('error-message').style.display = 'none';
  const userCredentails = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
    encryptedPrivateKey: privateKey
  };

  const changePwdResponse = await keylessInstance.changePassword(
    userCredentails
  );
  hideLoader();
  if (changePwdResponse.error) {
    return false;
  } else if (changePwdResponse.response) {
    return true;
  }
}
