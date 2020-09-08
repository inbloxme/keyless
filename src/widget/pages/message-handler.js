import { inbloxWidgetIcon, closeIcon, inbloxMe } from '../assets/images';

export function messageHandlerModal(message, transactionHash = null) {
  console.log('transactionHash: ', transactionHash);
  return `
  <div class="widget-modal-content active" id="message-handler-modal">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        ${message != undefined ? message : 'Keyless Widget'}
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
      ${
        message != undefined ? message : ''
      },your transaction is sent to the blockchain and is being mined. Click below to view in real time.
      </p>

      ${
        transactionHash && transactionHash != undefined && transactionHash != ''
          ? `
      <label class="ether-scan">
        Check your transaction on <a href="https://ropsten.etherscan.io/tx/${transactionHash}" target="_blank"><img src="https://etherscan.io/images/logo-ether.png" alt="ether-scan" class="ether-scan-logo"></a>
      </label>
      `
          : ''
      }
      <p class="transaction-message">
        Click Ok to continue
      </p>
      <div class="widget-modal-button">
        <button id="ok-button">
          Ok
        </button>
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

    <div class="close-button">
      <button id="close-icon" type="button">
        ${closeIcon}
      </button>
    </div>
  </div>`;
}
