/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { BeneficiaryError } from '@clean-rn/beneficiary/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { addBeneficiaryGenerator, addBeneficiarySaga } from '../../usecases/beneficiary';
import {
  IBeneficiaryTypes,
  beneficiaryAddFailed,
  beneficiaryAdded,
  resetError,
} from '../../commands/beneficiary';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

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

describe('AddBeneficiary - usecase', () => {
  let httpConnection: HttpConnection;
  let api: BeneficiaryApi;

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
    api = BeneficiaryApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const mockRequest = {
    iban: 'FR7616798000010000242599449',
    bic: 'TRZOFR21XXX',
    name: 'BENFMOCK',
  };

  const mockResponse = {
    beneficiaryId: 4004318954,
    iban: 'FR7616798000010000242599449',
    bic: 'TRZOFR21XXX',
    name: 'BENFMOCK',
    isActive: true,
  };

  const mockError400 = {
    message: 'Core::BeneficiaryService::Create - Bad Request',
    statusCode: 400,
    response: 'Core::BeneficiaryService::Create - Bad Request',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/beneficiary',
  };

  const mockError500 = {
    message: 'Core::BeneficiaryService::Create - Server Error',
    statusCode: 500,
    response: 'Core::BeneficiaryService::Create - Server Error',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/beneficiary',
  };

  it('Should wait for ADD_BENEFICIARY action and call listAccountsGenerator, should be done on next iteration', () => {
    const genObject = addBeneficiarySaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IBeneficiaryTypes.ADD_BENEFICIARY, addBeneficiaryGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call beneficiaryAdded if external acount', async () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(beneficiaryAdded(mockResponse))
      .next()
      .call(navigate, {
        route: IBeneficiaryStackPages.TRANSFER,
        params: { beneficiaryId: mockResponse.beneficiaryId, beneficiaryName: mockResponse.name },
      })
      .next();
  });

  it('Should call beneficiaryAdded if bank acount', async () => {
    const mockRequest = {
      name: 'Tumbalalali',
      iban: 'FR7616798000010000196245186',
      bic: 'TRZOFR21XXX',
    };
    const mockResponse = {
      accountId: 100,
      beneficiaryId: 400431,
      iban: 'FR7616798000010000196245186',
      bic: 'TRZOFR21XXX',
      name: 'Tumbalalali',
      isActive: true,
    };
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(beneficiaryAdded(mockResponse))
      .next()
      .call(navigate, {
        route: IBeneficiaryStackPages.TRANSFER,
        params: { beneficiaryAccountId: mockResponse.accountId, beneficiaryName: mockResponse.name },
      })
      .next();
  });

  it('Should call navigate to Login modale if 400 from Server', () => {
    const serverError = new ServerError(mockError400);
    serverError.statusCode = 400;

    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(serverError)
      .put(resetError())
      .next()
      .put(beneficiaryAddFailed(new BeneficiaryError.BeneficiaryAlreadyExists(serverError.message)))
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
