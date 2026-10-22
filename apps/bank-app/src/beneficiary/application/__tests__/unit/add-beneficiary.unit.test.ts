/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { selectBeneficiary } from '../../state-management/selectors';
import { addBeneficiaryGenerator, addBeneficiarySaga } from '../../usecases/beneficiary';
import { IBeneficiaryTypes, beneficiaryListed, beneficiaryListInit } from '../../commands/beneficiary';

describe('AddBeneficiary - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);

  const api = BeneficiaryApi.getInstance(httpConnection);
  const addBeneficiarySage = addBeneficiarySaga(httpConnection);

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

  const mockError500 = {
    message: 'Core::BeneficiaryService::Create - Server Error',
    statusCode: 500,
    response: 'Core::BeneficiaryService::Create - Server Error',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/beneficiary',
  };

  it('Should call beneficiaryListed with added data', async () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.BENEFICIARY_ADD,
      payload: mockRequest,
    })
      .next()
      .select(addBeneficiaryGenerator)
      .next({ beneficiaries: null })
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(beneficiaryListed([mockResponse]))
      .next()
      .call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST })
      .next();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.BENEFICIARY_ADD,
      payload: mockRequest,
    })
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.BENEFICIARY_ADD,
      payload: mockRequest,
    })
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(beneficiaryListInit())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.BENEFICIARY_ADD,
      payload: mockRequest,
    })
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(beneficiaryListInit())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
