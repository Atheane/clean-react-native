/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Customer, DocumentVO, IDocumentCategory, IDocumentStatus } from '@clean-rn/kyc/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { KycApi } from '@clean-rn/kyc/infrastructure';
import { User } from '@clean-rn/auth/domain';

import { IAuthStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IStoreKey } from '../../../../shared/application/types';

import { checkCustomerStatusGenerator, checkCustomerStatusSaga } from '../../usecases/customer';
import { ICustomerTypes, customerStatusChecked, initializeKyc } from '../../commands/customer';
import { selectUserFromLogin } from '../../state-management/selectors';

describe('KYC - CheckCustomerStatus - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = KycApi.getInstance(httpConnection);
  const genObject = checkCustomerStatusSaga(httpConnection);

  const mockResponse: DocumentVO[] = [
    {
      typeId: 9,
      category: IDocumentCategory.FIRST_ID,
      status: IDocumentStatus.PENDING,
      name: 'test-mock',
      createdAt: new Date('2023-10-03T13:20:21.303Z'),
    },
  ];

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/document/kyc',
    method: 'GET',
  };

  const mockError500 = {
    message: 'Core::DocumentService::Document - Server Error',
    statusCode: 500,
    response: 'Core::DocumentService::Document - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/app/document/kyc',
  };

  it('Should wait for CHECK_CUSTOMER_STATUS action and call checkCustomerStatusGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICustomerTypes.CHECK_CUSTOMER_STATUS, checkCustomerStatusGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call customerStatusChecked if status is not cached or not VALIDATED', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });

    const customer = Customer.Create({
      id: 123,
      properties: { USPerson: false },
    });

    customer.addDocument(mockResponse);
    customer.checkCustomerStatus();

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .next(null)
      .call([api, api.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next()
      .call(AsyncStorage.setItem, IStoreKey.CUSTOMER_STATUS, customer.properties.status)
      .next(customer.properties.status);
  });

  it('Should call customerStatusChecked if status cached and VALIDATED', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: false } });
    const customer = Customer.Create({
      id: 123,
      properties: { status: 'VALIDATED', USPerson: false },
    });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .next('VALIDATED')
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next({ customer })
      .cancel();
  });

  it('Should call customerStatusChecked if status cached and CANCELED', async () => {
    const user = User.Create({ id: 123, properties: { USPerson: true } });

    const customer = Customer.Create({
      id: 123,
      properties: { status: 'CANCELED', USPerson: true },
    });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .next('CANCELED')
      .put(
        customerStatusChecked({
          customer,
        }),
      )
      .next({ customer })
      .cancel();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .next(null)
      .call([api, api.getDocuments]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .next(null)
      .call([api, api.getDocuments])
      .throw(new ServerError(mockError500))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    const user = User.Create({ id: 123, properties: {} });

    testSaga(checkCustomerStatusGenerator, httpConnection)
      .next()
      .select(selectUserFromLogin)
      .next(user)
      .call(AsyncStorage.getItem, IStoreKey.CUSTOMER_STATUS)
      .throw(new Error('unknown error'))
      .put(initializeKyc())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
