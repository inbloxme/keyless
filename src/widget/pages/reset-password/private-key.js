import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

export function resetPasswordPrivateKey() {
  return `
  <div class="widget-modal-content active" id="reset-password-private-key">
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
        <label>Enter Private Key</label>
        <input type="text" id="private-key">
      </div>
    </div>
    <div class="widget-modal-input">
      <label id="error-message"></label>
    </div>
    <div class="widget-modal-button">
      <button id="submit-private-key">
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
