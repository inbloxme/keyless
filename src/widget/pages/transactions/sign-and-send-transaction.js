import {
  inbloxWidgetIcon,
  closeIcon,
  backIcon,
  inbloxMe
} from '../../assets/images';

import { loader } from '../loader';

import { hideLoader } from '../../utils/ui-helper';

export function signAndSendTransactionModal(currentUser) {
  return `
  <div class="widget-modal-content ${
    currentUser ? 'active' : ''
  }" id="sign-and-send-transaction">
    ${loader()}
    <div class="widget-modal-header">
      <div id="back-arrow-icon">
        ${backIcon}
      </div>
      ${inbloxWidgetIcon}
      <h1>
        Confirm Transaction
      </h1>
    </div>
    <div class="widget-modal-motes">
      <p>
        Sign transaction with your password to send it to blockchain. It's that easy!
      </p>
    </div>
    <div class="widget-modal-form">
      <div class="widget-modal-input">
        <label>Enter Password</label>
        <input type="password" id="sign-tranx-user-password" class="lg">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
      </div>
    </div>
    <div class="widget-modal-button">
      <button id="sign-and-send-tranx-button">
        Transact
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

// Sign & Send Transaction helper method.
export async function signAndSendTransaction(keylessInstance, transactionData) {
  const userPassword = document.getElementById('sign-tranx-user-password')
    .value;
  const tranxDetails = Object.assign({}, transactionData, {
    password: userPassword
  });

  const tranxResponse = await keylessInstance.signAndSendTx(tranxDetails);

  hideLoader();
  if (tranxResponse.error) {
    document.getElementById('error-message').innerHTML = tranxResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return { status: false };
  } else if (tranxResponse.response) {
    document.getElementById('error-message').style.display = 'none';
    return { status: true, hash: tranxResponse.response.transactionHash };
  }
}
