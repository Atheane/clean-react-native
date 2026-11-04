/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HOUSE_STATUS, House, FootprintError, Work } from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { addWorksSaga, addWorksGenerator } from '../../usecases/add-works';
import { worksAdded, worksNotAdded, IFootprintTypes, initializeFootprint } from '../../commands';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { FootprintApi } from '@clean-rn/footprint/infrastructure';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

import { mapWorkPropsToDomain } from '../../mappers';
import { selectHouse } from '../../selectors';
import { IWorksProps } from '../../../presentation/types';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockHeaterHouse, mockWorkData } from '../fixtures/mock-data';

describe('AddWorks - usecase', () => {
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

  const mockUserData = {
    userId: 100000352,
  };

  it('Should wait for ADD_WORKS action and call addWorksGenerator, should be done on next iteration', () => {
    const genObject = addWorksSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IFootprintTypes.ADD_WORKS, addWorksGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should call worksAdded', async () => {
    const worksVO = await mapWorkPropsToDomain(mockWorkData);
    const works = worksVO.map((workVO) =>
      Work.Create({
        workId: 'workId',
        work: workVO,
      }),
    );
    mockHeaterHouse.addWorks(works);

    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockWorkData,
    })
      .next()
      .call(mapWorkPropsToDomain, mockWorkData)
      .next(worksVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(mockHeaterHouse)
      .call([api, api.addWorks], {
        house: mockHeaterHouse,
        worksVO,
      })
      .next(mockHeaterHouse)
      .put(worksAdded(mockHeaterHouse))
      .next();
  });

  it('Should call WORKS_ADDED if no workTypes is provided', async () => {
    const mockProps = undefined;
    const worksVO = await mapWorkPropsToDomain(mockProps as unknown as IWorksProps);
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

    house.addWorks([]);

    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockProps as unknown as IWorksProps,
    })
      .next()
      .call(mapWorkPropsToDomain, mockProps)
      .next(worksVO)
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectHouse)
      .next(house)
      .call([api, api.addWorks], {
        house,
        worksVO: worksVO,
      })
      .next(house)
      .put(worksAdded(house))
      .next(house);
  });

  it('Should throw invalid work type if no work type is provided', async () => {
    const mockProps = {
      workType: undefined,
      workDate: 2022,
    };
    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockProps as unknown as IWorksProps,
    })
      .next()
      .call(mapWorkPropsToDomain, mockProps)
      .throw(new FootprintError.InvalidWorkType())
      .put(initializeFootprint())
      .next()
      .put(worksNotAdded(new FootprintError.InvalidWorkType()))
      .next();
  });

  it('should throw InvalidWorkDate when workDate is undefined', async () => {
    const invalidDateData = {
      ...mockWorkData,
      workDate: undefined,
    };

    await expect(mapWorkPropsToDomain(invalidDateData)).rejects.toThrow(FootprintError.InvalidWorkDate);
  });

  it('Should call showUnknownError action if unknown error', () => {
    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockWorkData,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
