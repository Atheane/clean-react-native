/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import {
  HOUSE_STATUS,
  House,
  FootprintError,
  HOUSE_WORK_TYPE,
  Work,
  WorkVO,
} from '@clean-rn/footprint/domain';
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

describe('AddWorks - usecase', () => {
  let httpConnection: HttpConnection;
  let api: FootprintApi;

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

  it('Should add works if house is not created', async () => {
    const mockProps = {
      workDate: 2022,
      worksType: [HOUSE_WORK_TYPE.WINDOW, HOUSE_WORK_TYPE.WALL],
    };

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

    const worksVO = await mapWorkPropsToDomain(mockProps);

    const houseWithWorks = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });

    const works = worksVO.map((workVO: WorkVO) =>
      Work.Create({
        workId: 'workId',
        work: workVO,
      }),
    );
    houseWithWorks.addWorks(works);

    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockProps,
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
      .next(houseWithWorks)
      .put(worksAdded(houseWithWorks))
      .next(houseWithWorks);
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

  it('should throw InvalidHeaterDate when workDate is undefined', async () => {
    const mockProps = {
      worksType: [HOUSE_WORK_TYPE.WALL],
      workDate: undefined,
    };

    await expect(mapWorkPropsToDomain(mockProps)).rejects.toThrow(FootprintError.InvalidWorkDate);
  });

  it('Should call showUnknownError action if unknown error', () => {
    const mockProps = {
      workDate: 2022,
      worksType: [HOUSE_WORK_TYPE.WINDOW],
    };

    testSaga(addWorksGenerator, httpConnection, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockProps,
    })
      .next()
      .throw(new Error('unknown error'))
      .put(initializeFootprint())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
