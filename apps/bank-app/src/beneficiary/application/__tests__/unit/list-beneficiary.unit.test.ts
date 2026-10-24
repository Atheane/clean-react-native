/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { selectBeneficiary } from '../../state-management/selectors';
import { listBeneficiaryGenerator, listBeneficiarySaga } from '../../usecases/beneficiary';
import { IBeneficiaryTypes, beneficiariesListed, resetError } from '../../commands/beneficiary';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

describe('ListBeneficiary - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');

  const api = BeneficiaryApi.getInstance(httpConnection);

  const genObject = listBeneficiarySaga(httpConnection);

  const mockResponse = [
    {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
      isActive: true,
    },
  ];

  const mockError500 = {
    message: 'Core::BeneficiaryService::Create - Server Error',
    statusCode: 500,
    response: 'Core::BeneficiaryService::Create - Server Error',
    timestamp: '2024-01-07T15:28:04.657Z',
    path: '/app/beneficiary',
  };

  it('Should wait for LIST_BENEFICIARIES action and call listBeneficiaryGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IBeneficiaryTypes.LIST_BENEFICIARIES, listBeneficiaryGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call beneficiaryListed if no cached data', async () => {
    testSaga(listBeneficiaryGenerator, httpConnection)
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getBeneficiary]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .next(mockResponse)
      .put(beneficiariesListed(mockResponse))
      .next();
  });

  it('Should call beneficiaryListed if beneficiaries cached', async () => {
    testSaga(listBeneficiaryGenerator, httpConnection)
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: mockResponse })
      .put(beneficiariesListed(mockResponse))
      .next();
  });

  it('Should call showUnknownError action if 500 from Server', () => {
    testSaga(listBeneficiaryGenerator, httpConnection)
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getBeneficiary]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(listBeneficiaryGenerator, httpConnection)
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries: null })
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([api, api.getBeneficiary]) // <- Utilisez cette syntaxe pour spécifier le contexte.
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
