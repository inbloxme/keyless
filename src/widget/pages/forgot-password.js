import { inbloxWidgetIcon, inbloxMe } from '../assets/images';

export function forgotPassword() {
  return `
  <div class="widget-modal-content active" id="forgot-password">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Forgot Password
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Select any of below options.
      </p>
    </div>
    <div class="rsps-card-wrap">
      <div class="rsps-card">
        <div class="widget-modal-button">
          <button id="change-password-button">
            Change
          </button>
        </div>
      </div>
      <div class="forgot-password-rsps-card">
        <span>Or</span>
      </div>
      <div class="rsps-card">
        <div class="widget-modal-button">
          <button id="reset-password-button">
            Reset
          </button>
        </div>
      </div>
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
