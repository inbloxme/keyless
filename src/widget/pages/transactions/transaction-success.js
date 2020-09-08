import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

export function transactionSuccess(transactionHash) {
  return `
  <div class="widget-modal-content active" id="transaction-success">
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Transaction Successful
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <label class="ether-scan">
        <span>
          <img src="https://etherscan.io/images/logo-ether.png" alt="ether-scan" class="ether-scan-logo">
        </span>
        Check your transaction on <a href="https://ropsten.etherscan.io/tx/${transactionHash}" target="_blank">here</a>
      </label>
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
