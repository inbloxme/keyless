import { failureIcon, inbloxMe } from '../../assets/images';

export function changePasswordFailureModal() {
  return `
  <div class="widget-modal-content active" id="change-password-failure">
    <div class="widget-modal-status">
      ${failureIcon}
      <h1>Opss! Something went wrong</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
    <div class="widget-modal-button">
      <button id="retry-change-password">
        Retry
      </button>
    </div>
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://inblox.me/">
          ${inbloxMe}
        </a>
      </p>a
    </div>
  </div>`;
}
