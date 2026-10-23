import { all } from 'redux-saga/effects';

import { initializeApplicationSaga } from './initialize-application';
import { loadStorageSaga } from './load-storage';
import { showUnknownErrorSaga } from './manage-global-errors';

import {
  loginSaga,
  closeLoginModalSaga,
  refreshSaga,
  resetPasswordSaga,
} from '../../../auth/application/usecases';

import {
  checkEmailSaga,
  registerIdentitySaga,
  registerPasswordSaga,
  checkPhoneSaga,
  registerBirthSaga,
  registerAddressSaga,
  validatePhoneSaga,
  signupUserSaga,
  updateNotificationsSaga,
} from '../../../user/application/usecases';

import { HttpConnection } from '@clean-rn/shared/infrastructure';

import { listAccountsSaga } from '../../../account/application/usecases';
import { listTransactionsSaga, sendTransferSaga } from '../../../transaction/application/usecases';

import {
  addBeneficiarySaga,
  deleteBeneficiarySaga,
  listBeneficiarySaga,
  selectBeneficiarySaga,
} from '../../../beneficiary/application/usecases';
import { addContactSaga, listContactSaga } from '../../../beneficiary/application/usecases';

import {
  computeHouseEmissionsSaga,
  computeTransportEmissionsSaga,
  computeFoodEmissionsSaga,
  computeFlyEmissionsSaga,
} from '../../../carbon/application/usecases';

import { checkCustomerStatusSaga } from '../../../kyc/application/usecases/customer';
import {
  initializeDocumentSaga,
  addPageSaga,
  uploadDocumentSaga,
  cancelUploadSaga,
} from '../../../kyc/application/usecases/document';
import { registerDeviceSaga } from '../../../device/application/usecases/register-device';

import {
  getCardSaga,
  changeCardLimitsSaga,
  toggleCardLockSaga,
  changeCardPINSaga,
} from '../../../card/application/usecases';

export function* rootSaga(httpConnection: HttpConnection) {
  yield all([
    initializeApplicationSaga(),
    loadStorageSaga(),
    showUnknownErrorSaga(),
    loginSaga(httpConnection),
    refreshSaga(httpConnection),
    closeLoginModalSaga(),
    resetPasswordSaga(httpConnection),
    checkEmailSaga(httpConnection),
    registerIdentitySaga(),
    registerPasswordSaga(),
    checkPhoneSaga(httpConnection),
    registerBirthSaga(),
    registerAddressSaga(),
    validatePhoneSaga(httpConnection),
    signupUserSaga(httpConnection),
    listAccountsSaga(httpConnection),
    registerDeviceSaga(httpConnection),
    addBeneficiarySaga(httpConnection),
    deleteBeneficiarySaga(httpConnection),
    listBeneficiarySaga(httpConnection),
    selectBeneficiarySaga(httpConnection),
    addContactSaga(),
    listContactSaga(),
    listTransactionsSaga(httpConnection),
    computeHouseEmissionsSaga(),
    computeTransportEmissionsSaga(),
    computeFoodEmissionsSaga(),
    computeFlyEmissionsSaga(),
    checkCustomerStatusSaga(httpConnection),
    initializeDocumentSaga(),
    addPageSaga(),
    uploadDocumentSaga(httpConnection),
    cancelUploadSaga(),
    updateNotificationsSaga(httpConnection),
    sendTransferSaga(httpConnection),
    getCardSaga(httpConnection),
    changeCardLimitsSaga(httpConnection),
    toggleCardLockSaga(httpConnection),
    changeCardPINSaga(httpConnection),
  ]);
}
