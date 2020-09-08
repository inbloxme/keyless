import { successIcon, inbloxMe } from '../../assets/images';

export function changePasswordSuccessModal() {
  return `
  <div class="widget-modal-content active" id="change-password-success">
    <div class="widget-modal-status">
      ${successIcon}
      <h1>Successful Password Change!</h1>
      <p>You can now use your new password to signin into your account</p>
    </div>
    <div class="widget-modal-button">
      <button id="sign-in-button">
        Sign in
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
