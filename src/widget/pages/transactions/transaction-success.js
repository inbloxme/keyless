import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

const { ROPSTEN_ETHERSCAN_URL, ETHERSCAN_LOGO_URL } = require('../../../config');

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
          <img src=${ETHERSCAN_LOGO_URL} alt="ether-scan" class="ether-scan-logo">
        </span>
        Check your transaction on <a href="${ROPSTEN_ETHERSCAN_URL}/${transactionHash}" target="_blank">here</a>
      </label>
    </div>
    <div class="widget-modal-footer">
      <p>
        powered by
        <a href="https://inblox.me/" target="_blank">
          ${inbloxMe}
        </a>
      </p>
    </div>
  </div>`;
}
