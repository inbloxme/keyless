import {
  inbloxWidgetIcon,
  metaMaskIcon,
  privateKeyIcon,
  keyStoreIcon,
  inbloxMe
} from '../../assets/images';

export function resetPasswordModal() {
  return `
  <div class="widget-modal-content active" id="reset-password">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
        <h1>
          Reset Password
        </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
    <div class="rsps-card-wrap">
      <div class="rsps-card">
        <label>
          <input type="radio" name="reset-password-by" class="rsps-card-input-element" value="reset-password-seed" />
            <div class="rsps-card-input">
              <div class="rsps-icon">
                ${metaMaskIcon}
              </div>
              <div class="rsps-text">
                <label>Seed Phrases</label>
              </div>
            </div>
        </label>
      </div>
      <div class="rsps-card">
        <label>
          <input type="radio" name="reset-password-by" class="rsps-card-input-element" value="reset-password-private-key" />
            <div class="rsps-card-input">
              <div class="rsps-icon">
                ${privateKeyIcon}
              </div>
              <div class="rsps-text">
                <label>Private key</label>
              </div>
            </div>
        </label>
      </div>
      <div class="rsps-card">
        <label>
          <input type="radio" name="reset-password-by" class="rsps-card-input-element" value="reset-password-upload-key-store" />
            <div class="rsps-card-input">
              <div class="rsps-icon">
                ${keyStoreIcon}
              </div>
              <div class="rsps-text">
                <label>Keystore file</label>
              </div>
            </div>
        </label>
      </div>
    </div>
    <div class="widget-modal-button">
      <button id="reset-option-selected">
        Select
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

// Reset Password helper method.
export async function resetPassword(keylessInstance, options) {
  const resetPwdResponse = await keylessInstance.resetPassword(options);
  hideLoader();
  if (typeof resetPwdResponse.error == 'string') {
    document.getElementById('error-message').innerHTML = resetPwdResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (Array.isArray(resetPwdResponse.error)) {
    var errorMessage = resetPwdResponse.error.map((e) => e.message).join(',');
    document.getElementById('error-message').innerHTML = errorMessage;
    document.getElementById('error-message').style.display = 'block';
    return false;
  } else if (resetPwdResponse.response) {
    document.getElementById('error-message').style.display = 'none';
    return true;
  }
}
