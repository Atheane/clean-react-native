import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import { Email } from '@clean-rn/auth/domain';
import {
  Phone,
  IGender,
  User,
  KYC_REVIEW,
  BirthDay,
  Country,
  IUpdateUserConfigCommand,
  IPhoneNotifications,
} from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { IAuthStackPages, IProfileStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

import { deleteUserAccountGenerator, deleteUserAccountSaga } from '../../usecases';
import { IUserTypes, initializeUser, userAccountDeleted } from '../../commands';
import { selectUser } from '../../state-management/selectors';

describe('Delete User Account - usecase', () => {
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

  const genObject = deleteUserAccountSaga(httpConnection);

  it('should wait for FETCH_DELETE_USER_ACCOUNT action and call deleteUserAccountGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_DELETE_USER_ACCOUNT, deleteUserAccountGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call userAccountDeleted actions if email does not exists', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .next(mockAuth)
      .put(refreshSuccess({ auth: mockAuth }))
      .next(mockAuth)
      .select(selectUser)
      .next(user)
      .call([userApi, userApi.deleteUserAccount])
      .next()
      .put(userAccountDeleted(user))
      .next()
      .call(navigate, { route: IProfileStackPages.GOODBYE })
      .next();
  });

  it('should call navigate to LOGIN actions if 401', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
      .next()
      .select(selectAuth)
      .next(mockAuth)
      .call([authApi, authApi.refresh], mockAuth.refreshToken)
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('should call showUnknownError if 500', () => {
    testSaga(deleteUserAccountGenerator, httpConnection)
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
    testSaga(deleteUserAccountGenerator, httpConnection)
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
