/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { getTransportSaga, getTransportGenerator } from '../../usecases/get-transport';
import { IFootprintTypes, initializeFootprint, transportCreated } from '../../commands';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockHeaterUser, mockTransport } from '../fixtures/mock-data';

describe('GetTransport - usecase', () => {
  let httpConnection: HttpConnection;
  let api: FootprintApi;

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();
    api = FootprintApi.getInstance(httpConnection);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for GET_TRANSPORT action and call getTransportGenerator, should be done on next iteration', () => {
    const genObject = getTransportSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.GET_TRANSPORT, getTransportGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call searchTransport', async () => {
    testSaga(getTransportGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(mockHeaterUser)
      .call([api, api.searchTransport], {
        userId: mockHeaterUser.id,
      })
      .next(mockTransport)
      .put(transportCreated(mockTransport))
      .next();
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getTransportGenerator, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
