/* eslint-disable comma-dangle */
/* eslint-disable import/no-cycle */
import events from 'events';

import {
  getUserToken,
  whetherUserLoggedIn,
  getAuthTab,
  generateModal,
  getActiveTabModal,
  EVENTS,
  showLoader,
  closeModal,
} from './utils';

import { loginModal, transactionDetailsConfirmation } from './pages';

import { login } from './pages/login';
import { signTransaction } from './pages/transactions/sign-transaction';
import { signAndSendTransaction } from './pages/transactions/sign-and-send-transaction';

const inbloxSDK = require('..');

export const eventEmitter = new events.EventEmitter();

export class Widget {
  constructor({ env, rpcURL }) {
    const token = getUserToken();

    this.inbloxKeyless = new inbloxSDK.Keyless({
      rpcURL,
      env
    });
    this.inbloxKeyless.authToken = token || '';
    this.handleName = '';
    this.publicAddress = '';
    this.signedTransaction = '';
    this.encryptedJson = '';
    this.isUserLoggedIn = whetherUserLoggedIn(this.inbloxKeyless.authToken);
    this.activeTabIdName = 'login';
    this.activeTab = loginModal();
    this.transactionData = {};
    this.oldPassword = '';
    this.privatKey = '';
    this.initMethod = '';

    this.isInitialised = false;
    this.EVENTS = EVENTS;
    this.ALL_EVENTS = '*';
    this.ERROR = 'KEYLESS_ERROR';
    this.INITIALISED_EVENTS = [];
  }

  getUserData() {
    if (this.isUserLoggedIn) {
      return { publicAddress: this.publicAddress, handleName: this.handleName };
    }

    return { error: 'User not logged in' };
  }

  getSignedData() {
    if (this.isUserLoggedIn && this.signedTransaction !== '') {
      return { signedTransaction: this.signedTransaction };
    }

    return { error: 'User not logged in or not signed transaction' };
  }

  getGasFeeAndValue(feeDetails, valueDetails) {
    return this.inbloxKeyless.convertToEth(feeDetails).then((gasFee) => this.inbloxKeyless
      .convertToEth(valueDetails)
      .then((valueInEth) => ({ gasFee, valueInEth })));
  }

  initLogin() {
    this.initMethod = 'login';
    this.activeTabIdName = 'login';
    this.activeTab = loginModal();

    try {
      generateModal(this);
    } catch (error) {
      throw error;
    }
  }

  initSignTransaction({
    to, value, gasPrice, gasLimit, data,
  }) {
    this.initMethod = 'sign-transaction';
    const fee = gasPrice * gasLimit;
    const feeDetails = {
      srcUnit: 'wei',
      amount: fee.toString(),
    };
    const valueDetails = {
      srcUnit: 'wei',
      amount: value.toString(),
    };

    this.getGasFeeAndValue(feeDetails, valueDetails).then((res) => {
      const { gasFee } = res;
      const { valueInEth } = res;

      this.transactionData = {
        to,
        valueInEth,
        value,
        gasPrice,
        gasLimit,
        data,
        gasFee,
      };

      getAuthTab(
        this,
        () => transactionDetailsConfirmation(this.transactionData),
        'transaction-details-confirmation'
      );

      try {
        generateModal(this);
      } catch (error) {
        throw error;
      }
    });
  }

  initSendTransaction({
    to, value, gasPrice, gasLimit, data,
  }) {
    this.initMethod = 'sign-and-send-transaction';
    const fee = gasPrice * gasLimit;
    const feeDetails = {
      srcUnit: 'wei',
      amount: fee.toString(),
    };
    const valueDetails = {
      srcUnit: 'wei',
      amount: value.toString(),
    };

    this.getGasFeeAndValue(feeDetails, valueDetails).then((res) => {
      const { gasFee } = res;
      const { valueInEth } = res;

      this.transactionData = {
        to,
        valueInEth,
        value,
        gasPrice,
        gasLimit,
        data,
        gasFee,
      };
      getAuthTab(
        this,
        () => transactionDetailsConfirmation(this.transactionData),
        'transaction-details-confirmation'
      );

      try {
        generateModal(this);
      } catch (error) {
        throw error;
      }
    });
  }

  initOnClickEvents() {
    // Onclick handler for Login modal.
    if (this.activeTabIdName === 'login') {
      const loginButton = document.getElementById('login-button');

      loginButton.onclick = async () => {
        const userEmail = document.getElementById('widget-user-email').value;
        const userPassword = document.getElementById('widget-user-password')
          .value;

        const emailPresent = userEmail && userEmail !== '';
        const passwordPresent = userPassword && userPassword !== '';

        if (emailPresent && passwordPresent) {
          document.getElementById('error-message').style.display = 'none';
          showLoader();
          const userLoggedIn = await login(this.inbloxKeyless);

          if (userLoggedIn.status === true) {
            const userData = userLoggedIn.data;

            this.isUserLoggedIn = userLoggedIn.status;
            this.handleName = userData.handleName;
            this.publicAddress = userData.publicAddress;

            eventEmitter.emit(this.EVENTS.LOGIN_SUCCESS, {
              status: true,
              eventName: this.EVENTS.LOGIN_SUCCESS,
              data: {
                handleName: userData.handleName,
                publicAddress: userData.publicAddress,
              },
            });
            closeModal(this.initMethod);
          } else {
            eventEmitter.emit(this.EVENTS.LOGIN_FAILURE, {
              status: false,
              eventName: this.EVENTS.LOGIN_FAILURE,
              data: {
                message: 'Either username or password is not valid',
              },
            });
          }
        } else {
          document.getElementById('error-message').innerHTML = 'Please enter email & password';
          document.getElementById('error-message').style.display = 'block';
        }
      };
    }

    // Onclick handler for transaction confirm modal.
    if (this.activeTabIdName === 'message-handler-modal') {
      const okButton = document.getElementById('ok-button');

      okButton.onclick = () => {
        closeModal(this.initMethod);
      };
    }

    // Onclick handler for transaction confirm modal.
    if (this.activeTabIdName === 'transaction-details-confirmation') {
      const transctionConfirmButton = document.getElementById('transaction-confirm-button');

      transctionConfirmButton.onclick = () => {
        this.setActiveTab(this.initMethod, {
          currentUser: this.isUserLoggedIn,
        });
      };
    }

    // Onclick handler for Sign Transaction modal.
    if (this.activeTabIdName === 'sign-transaction') {
      const signTranxButton = document.getElementById('sign-tranx-button');

      signTranxButton.onclick = async () => {
        showLoader();
        const signedTx = await signTransaction(this.inbloxKeyless, this.transactionData);

        if (signedTx.status) {
          this.signedTransaction = signedTx.hash;
          this.eventEmitter.emit(this.EVENTS.SIGN_TRANSACTION_SUCCESSFUL, {
            status: true,
            eventName: this.EVENTS.SIGN_TRANSACTION_SUCCESSFUL,
            data: {
              signedData: signedTx.hash,
            },
          });
        }  else {
          this.eventEmitter.emit(this.EVENTS.SIGN_TRANSACTION_FAILED, {
            status: true,
            eventName: this.EVENTS.SIGN_TRANSACTION_FAILED,
            data: {
              message: SIGN_TRANSACTION_FAILED,
            },
          });
        }
      };
    }

    // Onclick handler for Sign & send transaction modal.
    if (this.activeTabIdName === 'sign-and-send-transaction') {
      const backFromSignAndSendTranx = document.getElementById('back-arrow-icon');

      backFromSignAndSendTranx.onclick = () => {
        this.setActiveTab('transaction-details-confirmation', {
          transactionData: this.transactionData,
        });
      };

      const signAndSendTranxButton = document.getElementById('sign-and-send-tranx-button');

      signAndSendTranxButton.onclick = async () => {
        showLoader();
        const sentAndSignedTranx = await signAndSendTransaction(this.inbloxKeyless, this.transactionData);

        if (sentAndSignedTranx.status === true) {
          this.eventEmitter.emit(
            this.EVENTS.SIGN_AND_SEND_TRANSACTION_SUCCESSFUL,
            {
              status: true,
              eventName: this.EVENTS.SIGN_AND_SEND_TRANSACTION_SUCCESSFUL,
              data: {
                transactionHash: sentAndSignedTranx.hash,
              },
            },
          );
          this.setActiveTab('message-handler-modal', {
            message: SIGN_AND_SEND_TRANSACTION_SUCCESSFUL,
            transactionHash: sentAndSignedTranx.hash,
          });
        } else {
          this.eventEmitter.emit(this.EVENTS.SIGN_AND_SEND_TRANSACTION_FAILED, {
            status: true,
            eventName: this.EVENTS.SIGN_AND_SEND_TRANSACTION_FAILED,
            data: {
              message: SIGN_AND_SEND_TRANSACTION_FAILED,
            },
          });
        }
      };
    }
  }

  async setActiveTab(activeId, options = {}) {
    this.activeTabIdName = activeId;
    this.activeTab = await getActiveTabModal(activeId, options);
    generateModal(this);
  }
}

Widget.prototype.on = function (type, cb) {
  if (type === this.ALL_EVENTS) {
    for (const evKey in EVENTS) {
      const evName = EVENTS[evKey];

      if (!this.INITIALISED_EVENTS.includes(evName)) {
        this.INITIALISED_EVENTS.push(evName);
        eventEmitter.on(evName, cb);
      }
    }
  }

  if (EVENTS[type] && !this.INITIALISED_EVENTS.includes(EVENTS[type])) {
    this.INITIALISED_EVENTS.push(EVENTS[type]);
    eventEmitter.on(type, cb);
  }

  if (type === this.ERROR && !this.INITIALISED_EVENTS.includes(this.ERROR)) {
    this.INITIALISED_EVENTS.push(this.ERROR);
    eventEmitter.on(this.ERROR, cb);
  }
};
