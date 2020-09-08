import {
  setUserToken,
  whetherUserLoggedIn,
  getAuthTab,
  getUserToken
} from './storage-and-user-helper';

import {
  generateModal,
  getActiveTabModal,
  showLoader,
  hideLoader,
  closeModal
} from './ui-helper';

export { default as EVENTS } from './events';

export {
  getUserToken,
  setUserToken,
  whetherUserLoggedIn,
  getAuthTab,
  generateModal,
  getActiveTabModal,
  showLoader,
  hideLoader,
  closeModal
};
