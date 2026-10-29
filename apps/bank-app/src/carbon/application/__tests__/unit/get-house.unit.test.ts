/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HOUSE_STATUS, House } from '@clean-rn/carbon/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { getHouseSaga, getHouseGenerator } from '../../usecases/get-house';
import { ICarbonTypes, initializeCarbon } from '../../commands';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/carbon/infrastructure';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { selectUser } from '../../../../user/application/state-management/selectors';

describe('GetHouse - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const api = FootprintApi.getInstance(httpConnection);

  const genObject = getHouseSaga(httpConnection);

  const mockUserData = {
    userId: 100000352,
  };

  it('Should wait for GET_HOUSE action and call registerHeatersGenerator, should be done on next iteration', () => {
    expect(genObject.next().value).toEqual(
      takeEvery(ICarbonTypes.GET_HOUSE, getHouseGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should createHouse if house does not exists', async () => {
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const house = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });

    testSaga(getHouseGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([api, api.searchHouse], {
        userId: user.id,
      })
      .next()
      .call([api, api.createHouse], {
        userId: user.id,
        houseStatus: HOUSE_STATUS.OCCUPIED,
      })
      .next(house);
  });

  it('Should get house if house already created', async () => {
    const user = User.Create({
      id: mockUserData.userId,
      properties: {
        email: new Email('test@test.com'),
      },
    });
    const house = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    testSaga(getHouseGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectUser)
      .next(user)
      .call([api, api.searchHouse], {
        userId: user.id,
      })
      .next(house);
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(getHouseGenerator, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(initializeCarbon())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
