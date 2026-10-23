/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { BeneficiaryError } from '@clean-rn/beneficiary/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { addBeneficiaryGenerator, addBeneficiarySaga } from '../../usecases/beneficiary';
import {
  IBeneficiaryTypes,
  beneficiaryAddFailed,
  beneficiaryAdded,
  initBeneficiary,
} from '../../commands/beneficiary';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

describe('AddBeneficiary - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = BeneficiaryApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

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
  };

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      statusCode: 401,
      message: 'Unauthorized',
    },
    timestamp: '2023-10-03T13:20:21.303Z',
    path: '/app/beneficiary',
    method: 'POST',
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

  const genObject = addBeneficiarySaga(httpConnection);

  it('Should wait for ADD_BENEFICIARY action and call listAccountsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IBeneficiaryTypes.ADD_BENEFICIARY, addBeneficiaryGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call beneficiaryAdded', async () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(beneficiaryAdded(mockResponse))
      .next()
      .call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } })
      .next();
  });

  it('Should call navigate to Login modale if 400 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError400))
      .put(initBeneficiary())
      .next()
      .put(beneficiaryAddFailed(new BeneficiaryError.BeneficiaryAlreadyExists(mockError400.message)))
      .next()
      .cancel();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .put(initBeneficiary())
      .next()
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.ADD_BENEFICIARY,
      payload: mockRequest,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(initBeneficiary())
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
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(initBeneficiary())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
