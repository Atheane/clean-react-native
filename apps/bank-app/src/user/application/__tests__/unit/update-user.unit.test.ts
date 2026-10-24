import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import { IGender, User, KYC_REVIEW, BirthDay, Country, IUpdateUserCommand } from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { updateUserSaga, updateUserGenerator } from '../../usecases';
import { IUserTypes, resetError, userUpdated } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { IParametersStackPages, IRoutes } from '../../../../shared/presentation/types';
import { selectUser } from '../../../../user/application/state-management/selectors';
import { checkCustomerStatus } from '../../../../kyc/application/commands/customer';

describe('Update User - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const userApi = UserApi.getInstance(httpConnection);

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

  const mockUpdateUser1: IUpdateUserCommand & { nextRoute: IRoutes } = {
    firstName: 'new',
    lastName: 'lastname',
    birthDay: new BirthDay(dayjs('1989-01-01T00:00:00.000Z')),
    birthCountry: new Country('FR'),
    nationality: new Country('FR'),
    nextRoute: IParametersStackPages.PROFILE_ADDRESS,
  };

  const mockUpdateUser2: IUpdateUserCommand & { nextRoute: IRoutes } = {
    address: {
      str: 'street',
      city: 'city',
      zip: '40600',
      country: new Country('FR'),
    },
    USPerson: true,
    nextRoute: IParametersStackPages.PARAMETERS,
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_UPDATE_USER action and call updateLanguageGenerator, should be done on next iteration', () => {
    const genObject = updateUserSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_UPDATE_USER, updateUserGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call userUpdated if update identity', () => {
    user.updateUser(mockUpdateUser1);
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: mockUpdateUser1,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([userApi, userApi.updateUser], mockUpdateUser1)
      .next(user)
      .put(userUpdated(user))
      .next()
      .put(checkCustomerStatus({ user }))
      .next()
      .call(navigate, { route: IParametersStackPages.PROFILE_ADDRESS });
  });

  it('should call userUpdated if update address', () => {
    user.updateUser(mockUpdateUser2);
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: mockUpdateUser2,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([userApi, userApi.updateUser], mockUpdateUser2)
      .next(user)
      .put(userUpdated(user))
      .next()
      .put(checkCustomerStatus({ user }))
      .next()
      .call(navigate, { route: IParametersStackPages.PARAMETERS })
      .next();
  });

  it('should cancel if no data is updated', () => {
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: { nextRoute: IParametersStackPages.PROFILE_ADDRESS },
    })
      .next()
      .call(navigate, { route: IParametersStackPages.PROFILE_ADDRESS })
      .next()
      .put(resetError())
      .next()
      .cancel();
  });

  it('should call showUnknownError if 500', () => {
    user.updateUser(mockUpdateUser2);
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: mockUpdateUser2,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([userApi, userApi.updateUser], mockUpdateUser2)
      .next()
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call showUnknownError if unknown error', () => {
    user.updateUser(mockUpdateUser2);
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: mockUpdateUser2,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
