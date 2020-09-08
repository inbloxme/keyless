// Storage & user helper utils.
import { loginModal, signTransaction } from '../pages';

export function setUserToken(token) {
  localStorage.setItem('token', token);
}

export function getUserToken() {
  return localStorage.getItem('token');
}

export function whetherUserLoggedIn(keylessToken) {
  return keylessToken || getUserToken() ? true : false;
}

export function getAuthTab(widgetInstance, protectedModule, protectedModuleId) {
  if (widgetInstance.isUserLoggedIn) {
    widgetInstance.activeTabIdName = protectedModuleId;
    widgetInstance.activeTab = protectedModule();
  } else {
    widgetInstance.activeTabIdName = 'login';
    widgetInstance.activeTab = loginModal();
  }
}
