/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import {
  HEATER_TYPE,
  HEATER_USAGE,
  HOUSE_STATUS,
  House,
  Heater,
  FootprintError,
  HOUSE_WORK_TYPE,
  Work,
  WorkVO,
} from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { IFootprintState, footprintReducer } from '../../state-management';
import {
  addHeaters,
  addWorks,
  getHouse,
  heatersAdded,
  heatersNotAdded,
  houseCreated,
  IFootprintTypes,
  initializeFootprint,
  worksAdded,
  worksNotAdded,
} from '../../commands';
import { IHeaterProps, IWorksProps } from '../../../presentation/types';
import { mapHeaterPropsToDomain, mapWorkPropsToDomain } from '../../mappers';
import { addHeatersSaga } from '../../usecases/add-heaters';
import { getHouseSaga } from '../../usecases/get-house';
import { addWorksSaga } from '../../usecases/add-works';
import { selectHouse } from '../../selectors';
import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

describe('AddHeaters footprint - integration', () => {
  let sagaTester: SagaTester;

  const mockHeater: IHeaterProps = {
    usage: HEATER_USAGE.MAIN,
    heatType: HEATER_TYPE.ELECTRIC,
    installationYear: 2013,
    previousHeatType: HEATER_TYPE.FUEL_OIL,
    hasBeenChanged: true,
  };

  const mockWork: IWorksProps = {
    worksType: [HOUSE_WORK_TYPE.ROOF],
    workDate: 2022,
  };

  const mockUserData = {
    userId: 100000352,
  };

  const user = User.Create({
    id: mockUserData.userId,
    properties: {
      email: new Email('test@test.com'),
    },
  });

  const mockHouse = House.Create({
    userId: user.id,
    houseStatus: HOUSE_STATUS.OCCUPIED,
    houseId: 'houseId',
  });

  beforeEach(() => {
    const initialState: IFootprintState = {
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: footprintReducer,
    });
  });

  it('should select house from state', () => {
    const mockState = {
      footprint: {
        pending: false,
        estimate: {
          house: {
            data: null,
            footprint: null,
            average: null,
          },
          transport: {
            data: null,
            footprint: null,
            average: null,
          },
          food: {
            data: null,
            footprint: null,
            average: null,
          },
          fly: {
            data: null,
            footprint: null,
            average: null,
          },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      },
    };
    expect(selectHouse(mockState as IRootState)).toBe(mockState.footprint.house);
  });

  it('Should store correct state if ADD_HEATERS', () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.ADD_HEATERS,
      payload: mockHeater,
    });

    expect(newState).toEqual({
      pending: true,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if ADD_WORKS', () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.ADD_WORKS,
      payload: mockWork,
    });

    expect(newState).toEqual({
      pending: true,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: null,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if HOUSE_CREATED', () => {
    sagaTester.start(getHouseSaga);
    sagaTester.dispatch(getHouse());
    sagaTester.dispatch(houseCreated(mockHouse));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: mockHouse,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if HEATERS_ADDED', async () => {
    const heatersVO = await mapHeaterPropsToDomain(mockHeater);
    const houseWitHeaters = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const heaters = [] as Heater[];
    heatersVO.forEach((heater) => {
      heaters.push(
        Heater.Create({
          heaterId: 'heaterId',
          heater,
        }),
      );
    });
    houseWitHeaters.addHeaters(heaters);
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockHeater));
    sagaTester.dispatch(heatersAdded(houseWitHeaters));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: houseWitHeaters,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if WORKS_ADDED', async () => {
    const worksVO = await mapWorkPropsToDomain(mockWork);
    const houseWithWorks = House.Create({
      userId: user.id,
      houseStatus: HOUSE_STATUS.OCCUPIED,
      houseId: 'houseId',
    });
    const works = [] as Work[];
    worksVO.forEach(async (workVO: WorkVO) =>
      works.push(
        Work.Create({
          workId: 'workId',
          work: workVO,
        }),
      ),
    );

    houseWithWorks.addWorks(works);

    sagaTester.start(addWorksSaga);
    sagaTester.dispatch(addWorks(mockWork));
    sagaTester.dispatch(worksAdded(houseWithWorks));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: houseWithWorks,
      transport: null,
      error: null,
    });
  });

  it('Should store correct state if HEATERS_NOT_ADDED', async () => {
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockHeater));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(heatersNotAdded(new FootprintError.InvalidHeaterUsage()));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: mockHouse,
      transport: null,
      error: new FootprintError.InvalidHeaterUsage(),
    });
  });

  it('Should store correct state if WORKS_NOT_ADDED', async () => {
    sagaTester.start(addWorksSaga);
    sagaTester.dispatch(addWorks(mockWork));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(worksNotAdded(new FootprintError.InvalidWorkDate()));
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: mockHouse,
      transport: null,
      error: new FootprintError.InvalidWorkDate(),
    });
  });

  it('Should store correct state if INITIALIZE_FOOTPRINT', async () => {
    sagaTester.start(addHeatersSaga);
    sagaTester.dispatch(addHeaters(mockHeater));
    sagaTester.dispatch(houseCreated(mockHouse));
    sagaTester.dispatch(initializeFootprint());
    expect(sagaTester.getState()).toEqual({
      pending: false,
      estimate: {
        house: {
          data: null,
          footprint: null,
          average: null,
        },
        transport: {
          data: null,
          footprint: null,
          average: null,
        },
        food: {
          data: null,
          footprint: null,
          average: null,
        },
        fly: {
          data: null,
          footprint: null,
          average: null,
        },
      },
      footprint: null,
      house: mockHouse,
      transport: null,
      error: null,
    });
  });
});
