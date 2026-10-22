/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { ICardStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';

import { changeCardLimitsGenerator, changeCardLimitsSaga } from '../../usecases';
import { ICardTypes } from '../../commands';
import { selectAuth } from '../../../../auth/application/state-management/selectors';
import { refreshSuccess } from '../../../../auth/application/commands';
import { IChangeCardLimitsCommand } from '@clean-rn/card/domain';

describe('ChangeCardLimits - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = BeneficiaryApi.getInstance(httpConnection);
  const authApi = AuthApi.getInstance(httpConnection);

  const mockRequest: IChangeCardLimitsCommand = {
    cardId: '999826250',
    limits: {
      month: 8000,
      week: 500,
      day: 200,
    },
  };

  const mockResponse = {
    cardId: 999826250,
    userId: 100087408,
    publicToken: '100310268',
    statusCode: 'UNLOCK',
    isLive: false,
    pin: '6666',
    pinChange: 0,
    pinTryExceeds: false,
    expiryDate: '2027-01-31T00:00:00.000Z',
    limitPaymentYear: 30000,
    limitPaymentMonth: 8000,
    limitPaymentWeek: 500,
    limitPaymentDay: 200,
  };

  const mockToken = {
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };

  const mockError401 = {
    statusCode: 401,
    message: 'Unauthorized',
    response: {
      message: 'Unauthorized',
      statusCode: 401,
    },
    timestamp: '2024-01-30T16:43:19.792Z',
    path: '/app/card/999826250/limits',
    method: 'PUT',
  };

  const mockError403 = {
    statusCode: 403,
    message: 'Unauthorized',
    response: {
      message: 'Unauthorized',
      statusCode: 403,
    },
    timestamp: '2024-01-30T16:44:34.044Z',
    path: '/app/card/999826249/limits',
    method: 'PUT',
  };

  const mockError500 = {
    statusCode: 500,
    message: "Cannot read properties of null (reading 'cardId')",
    response: '',
    timestamp: '2024-01-30T16:44:14.795Z',
    path: '/app/card/99982625/limits',
    method: 'PUT',
    body: {
      limitPaymentDay: 300,
      limitPaymentWeek: 2500,
      limitPaymentMonth: 5000,
    },
  };

  const genObject = changeCardLimitsSaga(httpConnection);

  it('Should wait for CHANGE_CARD_LIMITS action and call changeCardLimitsGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICardTypes.FETCH_CHANGE_CARD_LIMITS, changeCardLimitsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call beneficiaryAdded', async () => {
    testSaga(changeCardLimitsGenerator, httpConnection, {
      type: ICardTypes.FETCH_CHANGE_CARD_LIMITS,
      // payload: mockRequest,
    })
      .next()
      .select(selectAuth)
      .next(mockToken)
      .call([authApi, authApi.refresh], mockToken.refreshToken)
      .next(mockToken)
      .put(refreshSuccess({ auth: mockToken }))
      .next({ auth: mockToken })
      // .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
      // .next(mockResponse)
      // .put(beneficiaryAdded(mockResponse))
      // .next()
      // .call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } })
      .next();
  });

  //   it('Should call navigate to Login modale if 400 from Server', () => {
  //     testSaga(addBeneficiaryGenerator, httpConnection, {
  //       type: IBeneficiaryTypes.ADD_BENEFICIARY,
  //       payload: mockRequest,
  //     })
  //       .next()
  //       .select(selectAuth)
  //       .next(mockToken)
  //       .call([authApi, authApi.refresh], mockToken.refreshToken)
  //       .next(mockToken)
  //       .put(refreshSuccess({ auth: mockToken }))
  //       .next()
  //       .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
  //       .throw(new ServerError(mockError400))
  //       .put(beneficiaryAddFailed(new BeneficiaryError.BeneficiaryAlreadyExists(mockError400.message)))
  //       .next()
  //       .cancel();
  //   });

  //   it('Should call navigate to Login modale if 401 from Server', () => {
  //     testSaga(addBeneficiaryGenerator, httpConnection, {
  //       type: IBeneficiaryTypes.ADD_BENEFICIARY,
  //       payload: mockRequest,
  //     })
  //       .next()
  //       .select(selectAuth)
  //       .next(mockToken)
  //       .call([authApi, authApi.refresh], mockToken.refreshToken)
  //       .next(mockToken)
  //       .put(refreshSuccess({ auth: mockToken }))
  //       .next()
  //       .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
  //       .throw(new ServerError(mockError401))
  //       .call(navigate, { route: IAuthStackPages.LOGIN })
  //       .next()
  //       .cancel();
  //   });

  //   it('Should call showUnknownError action if 500 from Server', () => {
  //     testSaga(addBeneficiaryGenerator, httpConnection, {
  //       type: IBeneficiaryTypes.ADD_BENEFICIARY,
  //       payload: mockRequest,
  //     })
  //       .next()
  //       .select(selectAuth)
  //       .next(mockToken)
  //       .call([authApi, authApi.refresh], mockToken.refreshToken)
  //       .next(mockToken)
  //       .put(refreshSuccess({ auth: mockToken }))
  //       .next()
  //       .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
  //       .throw(new ServerError(mockError500))
  //       .put(initBeneficiary())
  //       .next()
  //       .put(showUnknownError(new ServerError(mockError500)))
  //       .next();
  //   });

  //   it('Should call showUnknownError action if unknown error', () => {
  //     testSaga(addBeneficiaryGenerator, httpConnection, {
  //       type: IBeneficiaryTypes.ADD_BENEFICIARY,
  //       payload: mockRequest,
  //     })
  //       .next()
  //       .select(selectAuth)
  //       .next(mockToken)
  //       .call([authApi, authApi.refresh], mockToken.refreshToken)
  //       .next(mockToken)
  //       .put(refreshSuccess({ auth: mockToken }))
  //       .next()
  //       .call([api, api.addBeneficiary], mockRequest) // <- Utilisez cette syntaxe pour spécifier le contexte.
  //       .throw(new Error('unknown error'))
  //       .put(initBeneficiary())
  //       .next()
  //       .put(showUnknownError(new Error('unknown error')))
  //       .next();
  //   });
});
