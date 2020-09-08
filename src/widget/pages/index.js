import { loginModal } from './login';
import { messageHandlerModal } from './message-handler';
import { forgotPassword } from './forgot-password';
import { signTransactionModal } from './transactions/sign-transaction';
import { signAndSendTransactionModal } from './transactions/sign-and-send-transaction';
import { transactionDetailsConfirmation } from './transactions/transaction-details-confirmation';
import { transactionSuccess } from './transactions/transaction-success';

import { validateOldPasswordModal } from './change-password/validate-old-password';
import { changePasswordModal } from './change-password/change-password';
import { changePasswordFailureModal } from './change-password/failure';
import { changePasswordSuccessModal } from './change-password/success';

import { resetPasswordModal } from './reset-password';
import { resetPasswordPhrase } from './reset-password/phrase';
import { resetPasswordPrivateKey } from './reset-password/private-key';
import { resetPasswordSeed } from './reset-password/seed';
import { resetPasswordUploadKeyStore } from './reset-password/upload-key-store';
import { resetPasswordSuccessful } from './reset-password/reset-password-success';

export {
  loginModal,
  forgotPassword,
  signTransactionModal,
  signAndSendTransactionModal,
  transactionSuccess,
  validateOldPasswordModal,
  changePasswordModal,
  changePasswordFailureModal,
  changePasswordSuccessModal,
  resetPasswordModal,
  resetPasswordPhrase,
  resetPasswordPrivateKey,
  resetPasswordSeed,
  resetPasswordUploadKeyStore,
  transactionDetailsConfirmation,
  resetPasswordSuccessful,
  messageHandlerModal
};
