/* eslint-disable comma-dangle */
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
import { resetPassword } from './pages/reset-password';
import { changePasswordWithPrivateKey } from './pages/change-password/change-password';
import { validateOldPassword } from './pages/change-password/validate-old-password';

const inbloxSDK = require('..');

export const eventEmitter = new events.EventEmitter();

export class Widget {
  constructor() {
    // this.partnerData = partnerData;
    const token = getUserToken();

    this.inbloxKeyless = new inbloxSDK.Keyless({
      infuraKey: '7484a12fa3b544f79bf51ef44edd6db5',
      env: 'dev',
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

  initLogin() {
    this.initMethod = 'login';
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
    this.transactionData = {
      to, value, gasPrice, gasLimit, data,
    };
    getAuthTab(
      this,
      () => transactionDetailsConfirmation({
        to, value, gasPrice, gasLimit, data,
      }), 'transaction-details-confirmation'
    );

    try {
      generateModal(this);
    } catch (error) {
      throw error;
    }
  }

  initSendTransaction({
    to, value, gasPrice, gasLimit, data,
  }) {
    this.initMethod = 'sign-and-send-transaction';
    this.transactionData = {
      to, value, gasPrice, gasLimit, data,
    };
    getAuthTab(
      this,
      () => transactionDetailsConfirmation({
        to, value, gasPrice, gasLimit, data,
      }),
      'transaction-details-confirmation'
    );

    try {
      generateModal(this);
    } catch (error) {
      throw error;
    }
  }

  initOnClickEvents() {
    // Onclick handler for Login modal.
    if (this.activeTabIdName === 'login') {
      const forgetPassword = document.getElementById('forgot-password-link');
      const loginButton = document.getElementById('login-button');

      forgetPassword.onclick = () => {
        this.setActiveTab('reset-password');
      };

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
      const transctionConfirmButton = document.getElementById(
        'transaction-confirm-button'
      );

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
        const signedTx = await signTransaction(
          this.inbloxKeyless,
          this.transactionData
        );

        if (signedTx.status) {
          this.signedTransaction = signedTx.hash;
          eventEmitter.emit(this.EVENTS.TRANSACTION_SUCCESSFUL, {
            status: true,
            eventName: this.EVENTS.TRANSACTION_SUCCESSFUL,
            data: {
              transactionHash: signedTx.hash,
            },
          });
        } else {
          eventEmitter.emit(this.EVENTS.TRANSACTION_FAILED, {
            status: true,
            eventName: this.EVENTS.TRANSACTION_FAILED,
            data: {
              message: 'Transaction failed',
            },
          });
        }
      };
    }

    // Onclick handler for Sign & send transaction modal.
    if (this.activeTabIdName === 'sign-and-send-transaction') {
      const backFromSignAndSendTranx = document.getElementById(
        'back-arrow-icon'
      );
      const signAndSendTranxButton = document.getElementById(
        'sign-and-send-tranx-button'
      );

      backFromSignAndSendTranx.onclick = () => {
        this.setActiveTab('transaction-details-confirmation', {
          signedTransaction: this.transactionData,
        });
      };

      signAndSendTranxButton.onclick = async () => {
        showLoader();
        const sentAndSignedTranx = await signAndSendTransaction(
          this.inbloxKeyless,
          this.transactionData
        );

        if (sentAndSignedTranx.status === true) {
          eventEmitter.emit(this.EVENTS.TRANSACTION_SUCCESSFUL, {
            status: true,
            eventName: this.EVENTS.TRANSACTION_SUCCESSFUL,
            data: {
              transactionHash: sentAndSignedTranx.hash,
            },
          });
          this.setActiveTab('message-handler-modal', {
            message: 'Transaction Successful',
            transactionHash: sentAndSignedTranx.hash,
          });
        } else {
          eventEmitter.emit(this.EVENTS.TRANSACTION_FAILED, {
            status: true,
            eventName: this.EVENTS.TRANSACTION_FAILED,
            data: {
              message: 'Transaction failed',
            },
          });
        }
      };
    }

    // Onclick handler for Forgot password modal.
    if (this.activeTabIdName === 'forgot-password') {
      const changePasswordButton = document.getElementById('change-password-button');
      const resetPasswordButton = document.getElementById('reset-password-button');

      changePasswordButton.onclick = () => {
        this.setActiveTab('validate-old-password');
      };

      resetPasswordButton.onclick = () => {
        this.setActiveTab('reset-password');
      };
    }

    // Onclick handler for change password modal.
    if (this.activeTabIdName === 'validate-old-password') {
      const validateOldPasswordButton = document.getElementById('validate-old-password-button');

      validateOldPasswordButton.onclick = async () => {
        showLoader();
        const validateOldPassRes = await validateOldPassword(this.inbloxKeyless);

        if (validateOldPassRes.status === true) {
          this.privatKey = validateOldPassRes.privatKey;
          this.oldPassword = validateOldPassRes.oldPassword;
          this.setActiveTab('change-password');
        }
      };
    }

    // Onclick handler for change password modal.
    if (this.activeTabIdName === 'change-password') {
      const submitChangedPasswordButton = document.getElementById('submit-changed-password');

      submitChangedPasswordButton.onclick = async () => {
        showLoader();
        const changedPassword = await changePasswordWithPrivateKey(
          this.inbloxKeyless,
          this.privatKey,
          this.oldPassword
        );

        if (changedPassword === true) {
          this.setActiveTab('change-password-success');
        } else if (changedPassword === false) {
          this.setActiveTab('change-password-failure');
        }
      };
    }

    // Onclick handler for change password success modal.
    if (this.activeTabIdName === 'change-password-success') {
      const signInButton = document.getElementById('sign-in-button');

      signInButton.onclick = async () => {
        this.setActiveTab('login', { currentUser: true });
      };
    }

    // Onclick handler for change password failure modal.
    if (this.activeTabIdName === 'change-password-failure') {
      const retryButton = document.getElementById('retry-change-password');

      retryButton.onclick = async () => {
        this.setActiveTab('change-password');
      };
    }

    // Onclick handler for reset password modal.
    if (this.activeTabIdName === 'reset-password') {
      const selectResetButton = document.getElementById('reset-option-selected');

      selectResetButton.onclick = () => {
        const resetPasswordOption = document.querySelector('input[name="reset-password-by"]:checked').value;

        this.setActiveTab(resetPasswordOption);
      };
    }

    // Onclick handler for reset password using seed.
    if (this.activeTabIdName === 'reset-password-seed') {
      const submitSeedButton = document.getElementById('submit-seed');

      submitSeedButton.onclick = async () => {
        const seedPhrases = [];

        for (let i = 1; i < 12; i++) {
          seedPhrases.push(
            document.querySelector(`input[name="seed-${i}"]`).value
          );
        }
        const resetOptions = {
          seedPhrase: seedPhrases.join(' '),
        };

        showLoader();
        const resetPassswordResponse = await resetPassword(
          this.inbloxKeyless,
          resetOptions
        );

        if (resetPassswordResponse === true) {
          this.setActiveTab('reset-password-success');
        }
      };
    }

    // Onclick handler for reset password using private key.
    if (this.activeTabIdName === 'reset-password-private-key') {
      const submitPrivateKeyButton = document.getElementById('submit-private-key');

      submitPrivateKeyButton.onclick = async () => {
        const privatKey = document.getElementById('private-key').value;
        const resetOptions = {
          privateKey: privatKey,
        };

        showLoader();
        const resetPassswordResponse = await resetPassword(
          this.inbloxKeyless,
          resetOptions
        );

        if (resetPassswordResponse === true) {
          this.setActiveTab('reset-password-success');
        }
      };
    }

    // Onclick handler for reset password using key store.
    if (this.activeTabIdName === 'reset-password-upload-key-store') {
      const keyStoreFile = document.getElementById('key-store-file');

      keyStoreFile.onchange = async () => {
        const updateEncryptedJsonAndProceed = (encryptedJson) => {
          document.getElementById('show-uploading-message').style.display = 'none';
          document.getElementById('show-uploaded-message').style.display = 'block';
          this.encryptedJson = encryptedJson;
          this.setActiveTab('reset-password-phrase');
        };

        document.getElementById('show-uploading-message').style.display = 'block';
        const file = keyStoreFile.files[0];
        const fileread = new FileReader();

        fileread.onload = function (e) {
          updateEncryptedJsonAndProceed(JSON.parse(e.target.result));
        };
        fileread.readAsText(file);
      };
    }

    // Onclick handler for reset password using key store with phrase.
    if (this.activeTabIdName === 'reset-password-phrase') {
      const submitKeyStoreButton = document.getElementById('submit-key-store');

      submitKeyStoreButton.onclick = async () => {
        const walletPassword = document.getElementById('key-store-phrase').value;
        const resetOptions = {
          encryptedJson: this.encryptedJson,
          walletPassword,
        };

        showLoader();
        const resetPassswordResponse = await resetPassword(
          this.inbloxKeyless,
          resetOptions
        );

        if (resetPassswordResponse === true) {
          this.setActiveTab('reset-password-success');
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
    for (const eventName in EVENTS) {
      eventEmitter.on(EVENTS[eventName], cb);
    }
  }

  if (EVENTS[type]) {
    eventEmitter.on(type, cb);
  }
  if (type === this.ERROR) {
    eventEmitter.on(this.ERROR, cb);
  }
};
