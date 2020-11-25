import { closeIcon } from '../../assets/images/close-icon';

export function ModalLoader() {
  return `
  <div class="widget-modal-content active" id="modal-loader">
  <div>
    <div class="inblox-loader">
      <div class="loader-container">
        <img src="https://raw.githubusercontent.com/inbloxme/assets/master/loaders/universal.gif" alt="inblox-loader" />
      </div>
    </div>
  </div>

  <div class="close-button">
    <button id="close-icon" type="button">
      ${closeIcon}
    </button>
  </div>
</div>`;
}
