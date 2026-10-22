/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages, ITransferStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { selectBeneficiaryGenerator, selectBeneficiarySaga } from '../../usecases/beneficiary';
import { IBeneficiaryTypes, beneficiarySelected } from '../../commands/beneficiary';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { selectBeneficiary } from '../../state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';

describe('SelectBeneficiary - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const authApi = AuthApi.getInstance(httpConnection);

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

  const genObject = selectBeneficiarySaga(httpConnection);

  const beneficiaries = [
    {
      beneficiaryId: 4004318954,
      iban: 'FR7616798000010000242599449',
      bic: 'TRZOFR21XXX',
      name: 'BENFMOCK',
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
    path: '/app/beneficiary',
    method: 'POST',
  };

  it('Should wait for SELECT_BENEFICIARY action and call selectBeneficiaryGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(IBeneficiaryTypes.SELECT_BENEFICIARY, selectBeneficiaryGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call beneficiarySelected', async () => {
    testSaga(selectBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.SELECT_BENEFICIARY,
      payload: { beneficiaryId: 4004318954 },
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .select(selectBeneficiary)
      .next({ beneficiaries })
      .put(beneficiarySelected(mockResponse))
      .next(mockResponse)
      .call(navigate, { route: ITransferStackPages.MENU })
      .next();
  });

  it('Should call navigate to Login modale if 401 from Server', () => {
    testSaga(selectBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.SELECT_BENEFICIARY,
      payload: { beneficiaryId: 4004318954 },
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .throw(new ServerError(mockError401))
      .call(navigate, { route: IAuthStackPages.LOGIN })
      .next()
      .cancel();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(selectBeneficiaryGenerator, httpConnection, {
      type: IBeneficiaryTypes.SELECT_BENEFICIARY,
      payload: { beneficiaryId: 123 },
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next()
      .select(selectBeneficiary)
      .throw(new Error('unknown error'))
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
