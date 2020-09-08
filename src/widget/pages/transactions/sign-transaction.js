import { inbloxWidgetIcon, inbloxMe } from '../../assets/images';

import { loader } from '../loader';

import { hideLoader } from '../../utils/ui-helper';

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
        <input type="password" id="sign-tranx-user-password" class="lg">
      </div>
      <div class="widget-modal-input">
        <span id="error-message"></span>
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
        <a href="https://inblox.me/">
          ${inbloxMe}
        </a>
      </p>
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
    document.getElementById('error-message').innerHTML =
      signTranxResponse.error;
    document.getElementById('error-message').style.display = 'block';
    return { status: false };
  } else if (signTranxResponse.response) {
    document.getElementById('error-message').style.display = 'none';
    return { status: true, hash: signTranxResponse.response };
  }
}
