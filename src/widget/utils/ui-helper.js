/* eslint-disable comma-dangle */
// Widget ui helpers.
import { exportCss } from '../assets/css';
import {
  loginModal,
  signTransactionModal,
  signAndSendTransactionModal,
  transactionSuccess,
  transactionDetailsConfirmation,
  messageHandlerModal,
} from '../pages';

import { ModalLoader } from '../pages/loaders/modal-loader';

const { KEYLESS_WIDGET_CLOSED } = require('../../constants/responses');

export function getActiveTabModal(activeId, options, transactionUrl) {
  let activeTabModal = '';

  switch (activeId) {
    case 'login':
      activeTabModal = loginModal();
      break;
    case 'message-handler-modal':
      activeTabModal = messageHandlerModal(
        options.message,
        options.transactionHash,
        transactionUrl
      );
      break;
    case 'sign-transaction':
      activeTabModal = signTransactionModal(options.currentUser);
      break;
    case 'sign-and-send-transaction':
      activeTabModal = signAndSendTransactionModal(options.currentUser);
      break;
    case 'transaction-details-confirmation':
      activeTabModal = transactionDetailsConfirmation(
        options.transactionData
      );
      break;
    case 'transaction-success':
      activeTabModal = transactionSuccess(options.transactionHash);
      break;
    default:
      activeTabModal = loginModal();
  }

  return activeTabModal;
}

export async function generateModal(widgetInstance) {
  let wrapper = document.getElementById('safleKeylessWidget');

  if (wrapper == null) {
    wrapper = document.createElement('div');
    wrapper.id = 'safleKeylessWidget';
  }
  wrapper.innerHTML = `${widgetInstance.activeTab}`;

  let container = document.getElementsByTagName('body');

  if (!container) container = document.getElementsByTagName('html');
  if (!container) container = document.getElementsByTagName('div');
  await container[0].appendChild(wrapper);

  const safleKeylessWidget = document.getElementById('safleKeylessWidget');

  const style = await document.createElement('style');

  style.innerHTML = exportCss();
  if (safleKeylessWidget) await safleKeylessWidget.appendChild(style);

  // Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';

  if (safleKeylessWidget && safleKeylessWidget.style) {
    safleKeylessWidget.style.display = 'block';
  }

  if (!widgetInstance.isInitialised) {
    widgetInstance.isInitialised = true;
    widgetInstance.eventEmitter.emit(
      widgetInstance.EVENTS.KEYLESS_WIDGET_INITIALISED,
      {
        status: true,
        eventName: widgetInstance.EVENTS.KEYLESS_WIDGET_INITIALISED
      }
    );
  }

  initCloseEvents(widgetInstance);
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

export async function showModalLoader() {
  let loaderWrapper = document.getElementById('keylessWidgetModalLoader');

  if (loaderWrapper == null) {
    loaderWrapper = document.createElement('div');
    loaderWrapper.id = 'keylessWidgetModalLoader';
  }
  loaderWrapper.innerHTML = ModalLoader();

  let container = document.getElementsByTagName('body');

  if (!container) container = document.getElementsByTagName('html');
  if (!container) container = document.getElementsByTagName('div');
  await container[0].appendChild(loaderWrapper);

  const widgetModalLoader = document.getElementById('keylessWidgetModalLoader');

  const style = await document.createElement('style');

  style.innerHTML = exportCss();
  if (widgetModalLoader) await widgetModalLoader.appendChild(style);

  // Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';

  if (widgetModalLoader && widgetModalLoader.style) {
    widgetModalLoader.style.display = 'block';
  }
}

export function hideModalLoader() {
  // Enable background scrolling when overlay removed
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
  document.getElementById('keylessWidgetModalLoader').remove();
}

export function closeModal(widgetInstance, initMethod = 'useractivity') {
  // Prevent background scrolling when overlay appears
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
  document.getElementById('safleKeylessWidget').remove();

  widgetInstance.eventEmitter.emit('KEYLESS_WIDGET_CLOSED', {
    status: true,
    eventName: 'KEYLESS_WIDGET_CLOSED',
    initMethod: widgetInstance.initMethod,
    data: {
      message: KEYLESS_WIDGET_CLOSED,
    },
  });
}

function initCloseEvents(widgetInstance) {
  const closeIcon = document.getElementById('close-icon');
  // When the user clicks on close icon (x), close the modal

  closeIcon.onclick = () => {
    closeModal(widgetInstance);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    const customModal = document.getElementById('safleKeylessWidget');

    if (customModal && event.target === customModal) {
      closeModal(widgetInstance);
    }
  };
}
