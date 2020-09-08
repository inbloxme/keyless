import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

export function resetPasswordSuccessful() {
  return `
  <div class="widget-modal-content active" id="reset-password-success">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Reset Password Successful
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Password reset link sent to registered email address.
      </p>
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
