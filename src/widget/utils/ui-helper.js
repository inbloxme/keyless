// Widget ui helpers.
import { exportCss } from '../assets/css';
import {
  loginModal,
  forgotPassword,
  signTransactionModal,
  signAndSendTransactionModal,
  transactionSuccess,
  changePasswordModal,
  changePasswordFailureModal,
  changePasswordSuccessModal,
  resetPasswordModal,
  resetPasswordPhrase,
  resetPasswordPrivateKey,
  resetPasswordSeed,
  resetPasswordUploadKeyStore,
  resetPasswordSuccessful,
  validateOldPasswordModal,
  transactionDetailsConfirmation,
  messageHandlerModal
} from '../pages';

import { eventEmitter } from '..';

export function getActiveTabModal(activeId, options) {
  var activeTabModal = '';
  switch (activeId) {
    case 'login':
      activeTabModal = loginModal();
      break;
    case 'message-handler-modal':
      activeTabModal = messageHandlerModal(
        options['message'],
        options['transactionHash']
      );
      break;
    case 'forgot-password':
      activeTabModal = forgotPassword();
      break;
    case 'sign-transaction':
      activeTabModal = signTransactionModal(options['currentUser']);
      break;
    case 'sign-and-send-transaction':
      activeTabModal = signAndSendTransactionModal(options['currentUser']);
      break;
    case 'transaction-details-confirmation':
      activeTabModal = transactionDetailsConfirmation(
        options['signedTransaction']
      );
      break;
    case 'transaction-success':
      activeTabModal = transactionSuccess(options['transactionHash']);
      break;
    case 'validate-old-password':
      activeTabModal = validateOldPasswordModal();
      break;
    case 'change-password':
      activeTabModal = changePasswordModal();
      break;
    case 'change-password-failure':
      activeTabModal = changePasswordFailureModal();
      break;
    case 'change-password-success':
      activeTabModal = changePasswordSuccessModal();
      break;
    case 'reset-password':
      activeTabModal = resetPasswordModal();
      break;
    case 'reset-password-phrase':
      activeTabModal = resetPasswordPhrase();
      break;
    case 'reset-password-private-key':
      activeTabModal = resetPasswordPrivateKey();
      break;
    case 'reset-password-seed':
      activeTabModal = resetPasswordSeed();
      break;
    case 'reset-password-upload-key-store':
      activeTabModal = resetPasswordUploadKeyStore();
      break;
    case 'reset-password-success':
      activeTabModal = resetPasswordSuccessful();
      break;
    default:
      activeTabModal = loginModal();
  }
  return activeTabModal;
}

export async function generateModal(widgetInstance) {
  let wrapper = document.getElementById('inbloxKeylessWidget');
  if (wrapper == null) {
    wrapper = document.createElement('div');
    wrapper.id = 'inbloxKeylessWidget';
  }
  wrapper.innerHTML = `${widgetInstance.activeTab}`;

  let container = document.getElementsByTagName('body');
  if (!container) container = document.getElementsByTagName('html');
  if (!container) container = document.getElementsByTagName('div');
  await container[0].appendChild(wrapper);

  let inbloxKeylessWidget = document.getElementById('inbloxKeylessWidget');

  let style = await document.createElement('style');
  style.innerHTML = exportCss();
  if (inbloxKeylessWidget) await inbloxKeylessWidget.appendChild(style);

  //Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';

  if (inbloxKeylessWidget && inbloxKeylessWidget.style) {
    inbloxKeylessWidget.style.display = 'block';
  }

  if (!widgetInstance.isInitialised) {
    widgetInstance.isInitialised = true;
    eventEmitter.emit(widgetInstance.EVENTS.KEYLESS_WIDGET_INITIALISED, {
      status: true,
      eventName: widgetInstance.EVENTS.KEYLESS_WIDGET_INITIALISED
    });
  }

  initCloseEvents();
  widgetInstance.initOnClickEvents();
}

export function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

export function closeModal(initMethod = 'useractivity') {
  //Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
  document.getElementById('inbloxKeylessWidget').remove();

  eventEmitter.emit('KEYLESS_WIDGET_CLOSED', {
    status: true,
    eventName: 'KEYLESS_WIDGET_CLOSED',
    initMethod: initMethod,
    data: {
      message: 'Keyless widget closed'
    }
  });
}

function initCloseEvents() {
  const closeIcon = document.getElementById('close-icon');
  // When the user clicks on close icon (x), close the modal
  closeIcon.onclick = () => {
    closeModal();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    const customModal = document.getElementById('inbloxKeylessWidget');
    if (customModal && event.target === customModal) {
      closeModal();
    }
  };
}
