import { inbloxWidgetIcon, inbloxMe, closeIcon } from '../../assets/images';

import { loader } from '../loaders/loader';

import { hideLoader } from '../../utils/ui-helper';

import { SIGN_TRANSACTION_SUCCESSFUL } from '../../../constants/responses';

export function signTransactionModal(currentUser) {
  return `
  <div class="widget-modal-content ${
    currentUser ? 'active' : ''
  }" id="sign-transaction">
    ${loader()}
    <div class="widget-modal-header">
      ${inbloxWidgetIcon}
      <h1>
        Sign Transaction
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
        <input type="password" id="sign-tranx-user-password">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
        <span id="sign-success-message"></span>
      </div>
    </div>
    <div class="widget-modal-button">
      <button id="sign-tranx-button">
        Transact
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

// Sign Transaction helper method.
export async function signTransaction(keylessInstance, transactionData) {
  const userPassword = document.getElementById('sign-tranx-user-password')
    .value;
  const tranxDetails = Object.assign({}, transactionData, {
    password: userPassword
  });

  const signTranxResponse = await keylessInstance.signTransaction(tranxDetails);
  hideLoader();
  if (signTranxResponse.error) {
    document.getElementById('sign-tranx-button').disabled = false;
    document.getElementById('sign-success-message').style.display = 'none';
    document.getElementById('error-message').innerHTML =
      signTranxResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return { status: false };
  } else if (signTranxResponse.response) {
    document.getElementById('sign-tranx-button').disabled = true;
    document.getElementById(
      'sign-success-message'
    ).innerHTML = SIGN_TRANSACTION_SUCCESSFUL;
    document.getElementById('sign-success-message').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
    return { status: true, hash: signTranxResponse.response };
  }
}
