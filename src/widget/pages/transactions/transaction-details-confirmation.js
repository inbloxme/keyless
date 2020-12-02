import { inbloxWidgetIcon, closeIcon, inbloxMe } from '../../assets/images';

export function transactionDetailsConfirmation(transactionData) {
  return `
  <div class="widget-modal-content active" id="transaction-details-confirmation">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Confirm Transaction
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        <label>To Address :</label>
        <span>${transactionData.to || '-'}</span>
      </p>
      <p>
        <label>Value : </label>
        <span>${transactionData.valueInEth || '-'} ETH</span>
      </p>
      <p>
        <label>Gas Fee : </label>
        <span>${transactionData.gasFee || '-'} ETH</span>
      </p>
    </div>
    <div class="widget-modal-button">
      <button id="transaction-confirm-button">
        Confirm
      </button>
    </div>
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://inblox.me/" target="_blank">
          ${inbloxMe}
        </a>
      </p>
    </div>

    <div class="close-button">
      <button id="close-icon" type="button">
        ${closeIcon}
      </button>
    </div>
  </div>`;
}
