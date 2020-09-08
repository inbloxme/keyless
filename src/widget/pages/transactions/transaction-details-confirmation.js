const web3 = require('web3');

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
        <span>${hexToNumberString(transactionData.value) || '-'}</span>
      </p>
      <p>
        <label>Gas Free : </label>
        <span>${
          calculateGasFee(transactionData.gasPrice, transactionData.gasLimit) ||
          '-'
        }</span>
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
        <a href="https://inblox.me/">
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

function calculateGasFee(price, limit) {
  const fee = price * limit;
  const weiQuantity = web3.utils.toWei(fee.toString(), 'gwei');
  const etherQuantity = web3.utils.fromWei(weiQuantity, 'ether');

  return etherQuantity;
}

function hexToNumberString(hexa) {
  return web3.utils.hexToNumberString(hexa);
}
