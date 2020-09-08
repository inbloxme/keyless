import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

export function resetPasswordPhrase() {
  return `
  <div class="widget-modal-content active" id="reset-password-phrase">
    ${loader()}
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
    <div class="widget-modal-form">
      <div class="widget-modal-input">
        <label>Enter Passpharse</label>
        <input type="password" class="lg" id="key-store-phrase">
      </div>
    </div>
    <div class="widget-modal-input">
      <label id="error-message"></label>
    </div>
    <div class="widget-modal-button">
      <button id="submit-key-store">
        Submit
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
