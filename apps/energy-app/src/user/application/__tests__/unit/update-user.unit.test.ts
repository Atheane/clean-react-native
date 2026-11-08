import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';
import { Customer, KYC_EVENTS } from '@clean-rn/kyc/domain';
import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import {
  IGender,
  User,
  KYC_REVIEW,
  BirthDay,
  Country,
  IUpdateUserCommand,
  APP_USER_OCCUPATION,
  APP_USER_MONTHLY_INCOME_RANGE,
  APP_USER_PERSONAL_ASSETS_RANGE,
} from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IParametersStackPages, IRoutes } from '../../../../shared/presentation/types';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';
import { selectCustomer } from '../../../../kyc/application/state-management/selectors';

import { updateUserSaga, updateUserGenerator } from '../../usecases';
import { IUserTypes, resetError, userUpdated } from '../../commands';
import { DomainEventManager } from '@clean-rn/ddd';

jest.mock('@clean-rn/shared/infrastructure', () => ({
  HttpConnection: {
    getInstance: jest.fn(),
  },
  ServerError: jest.fn().mockImplementation(function (error) {
    this.message = error.message;
    this.name = 'ServerError';
    this.statusCode = error.statusCode;
    this.codeError = error.codeError;
    this.cause = error.response;
  }),
}));

describe('Update User - usecase', () => {
  let httpConnection: HttpConnection;
  let userApi: UserApi;
  const domainManagerInstance = DomainEventManager.getInstance();
  const mockCustomer = Customer.Create({
    id: 123,
    properties: {
      status: KYC_REVIEW.NONE,
      USPerson: false,
      reviewComment: '',
    },
  });
  const mockRevenues = {
    income: APP_USER_MONTHLY_INCOME_RANGE.K10,
    assets: APP_USER_PERSONAL_ASSETS_RANGE.A4,
    occupation: APP_USER_OCCUPATION.PUBLIC_EMPLOYEE,
  };
  const mockCustomerWithRevenues = Customer.Create({
    id: 123,
    properties: {
      status: KYC_REVIEW.NONE,
      USPerson: false,
      reviewComment: '',
    },
  });
  mockCustomerWithRevenues.checkStepRevenues(mockRevenues);
  beforeEach(() => {
    httpConnection = {
      baseUrl: 'http://mock-api.com',
      options: jest.fn(),
      handleError: jest.fn(),
      getDefaultHeaders: jest.fn(),
      attachBearerToken: jest.fn(),
    };
    HttpConnection.getInstance.mockReturnValue(httpConnection);
    global.fetch = jest.fn();
    userApi = UserApi.getInstance(httpConnection);
    jest.spyOn(domainManagerInstance, 'emit').mockImplementation((eventName: string, data: Customer) => {
      return true;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

  const mockUpdateUserWithRevenues: IUpdateUserCommand = {
    revenues: {
      income: APP_USER_MONTHLY_INCOME_RANGE.K10,
      assets: APP_USER_PERSONAL_ASSETS_RANGE.A4,
      occupation: APP_USER_OCCUPATION.PUBLIC_EMPLOYEE,
    },
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

  it('should call REVENUES_CHECKED if revenues is populated', () => {
    user.updateUser(mockUpdateUserWithRevenues);
    testSaga(updateUserGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_USER,
      payload: { ...mockUpdateUserWithRevenues, nextRoute: IParametersStackPages.PARAMETERS },
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([userApi, userApi.updateUser], {
        ...mockUpdateUserWithRevenues,
        nextRoute: IParametersStackPages.PARAMETERS,
      })
      .next(user)
      .put(userUpdated(user))
      .next(user)
      .select(selectCustomer)
      .next(mockCustomer);
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(KYC_EVENTS.CUSTOMER_CREATED, expect.any(Object));
    expect(domainManagerInstance.emit).toHaveBeenCalledWith(
      KYC_EVENTS.REVENUES_CHECKED,
      mockCustomerWithRevenues,
    );
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
