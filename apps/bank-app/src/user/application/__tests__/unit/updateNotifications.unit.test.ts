import { SelectEffectDescriptor, SimpleEffect, takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import { Email } from '@clean-rn/auth/domain';
import {
  Phone,
  IGender,
  UserError,
  User,
  IUserProperties,
  KYC_REVIEW,
  BirthDay,
  Country,
  IUpdateUserConfigCommand,
  IPhoneNotifications,
} from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { IUserSearchServerCode, UserApi } from '@clean-rn/user/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailGenerator,
  checkEmailSaga,
  registerIdentityGenerator,
  registerIdentitySaga,
  checkPhoneGenerator,
  checkPhoneSaga,
  registerPasswordGenerator,
  registerPasswordSaga,
  registerBirthGenerator,
  registerBirthSaga,
  registerAddressSaga,
  registerAddressGenerator,
  validatePhoneGenerator,
  validatePhoneSaga,
  signupUserSaga,
  signupUserGenerator,
  updateNotificationsSaga,
  updateNotificationsGenerator,
} from '../../usecases';
import { selectUserFromSignup } from '../../state-management/selectors';

import { IUserTypes, initializeUser, notificationUpdated } from '../../commands';
import { IStoreKey } from '../../../../shared/application/types';
import { IAuthStackPages, IUserStackPages } from '../../../../shared/presentation/types';
import { goBack, navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectAuth, selectUser } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

describe('Update Notifications - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const userApi = UserApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const user = User.Create({
    id: 123,
    properties: {
      kycReview: KYC_REVIEW.NONE,
      USPerson: false,
      birth: {
        birthday: new BirthDay(dayjs('1980-01-01T00:00:00.000Z')),
        nationality: new Country('SE'),
      },
      email: new Email('user1@example.com'),
      identity: {
        firstName: 'aze',
        gender: IGender.NEUTRAL,
        lastName: 'aze',
      },
      phone: new Phone('+46726413201'),
    },
  });

  const mockAuth = {
    accessToken: '123',
    refreshToken: '123',
  };

  const mockUpdateNotifications: IUpdateUserConfigCommand = {
    notifFirebaseDisabled: [IPhoneNotifications.PAYOUT_INITIATED],
  };

  const mockError401 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 401,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_UPDATE_NOTIFICATIONS action and call updateNotificationsGenerator, should be done on next iteration', () => {
    const genObject = updateNotificationsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_UPDATE_NOTIFICATIONS, updateNotificationsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call notificationUpdated actions if email does not exists', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateNotifications);

    testSaga(updateNotificationsGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_NOTIFICATIONS,
      payload: mockUpdateNotifications,
    })
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .next(mockAuth)
      .put(refreshSuccess({ auth: mockAuth }))
      .next(mockAuth)
      .call([userApi, userApi.updateConfig], mockUpdateNotifications)
      .next(userWithConfig)
      .put(notificationUpdated({ user: userWithConfig }))
      .next()
      .call(goBack)
      .next();
  });

  it('should call navigate to LOGIN actions if 401', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateNotifications);

    testSaga(updateNotificationsGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_NOTIFICATIONS,
      payload: mockUpdateNotifications,
    })
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .throw(new ServerError(mockError401))
      .put(initializeUser())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('should call showUnknownError if 500', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateNotifications);

    testSaga(updateNotificationsGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_NOTIFICATIONS,
      payload: mockUpdateNotifications,
    })
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .throw(new ServerError(mockError500))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call showUnknownError if unknown error', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateNotifications);

    testSaga(updateNotificationsGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_NOTIFICATIONS,
      payload: mockUpdateNotifications,
    })
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .throw(new Error('unknown error'))
      .put(initializeUser())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
