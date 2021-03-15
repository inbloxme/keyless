import { closeIcon } from '../../assets/images/close-icon';
import { Loader } from '../../assets/images';

export function ModalLoader() {
  return `
  <div class="widget-modal-content active" id="modal-loader">
  <div>
    <div class="safle-loader">
      <div class="loader-container">
        ${Loader}
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
