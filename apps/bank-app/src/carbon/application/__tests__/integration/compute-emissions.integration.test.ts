/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import { HeaterE, HouseE, YearE } from '@bank/carbon-weight/dist/house/types';
import { FuelE } from '@bank/carbon-weight/dist/vehicle/types';
import { SeatE } from '@bank/carbon-weight/dist/flight/types';

import { FoodEmissions, HouseEmissions, TransportEmissions, FlyEmissions } from '@clean-rn/carbon/domain';

import { ICarbonState, carbonReducer } from '../../state-management';
import {
  ICarbonTypes,
  computeHouseEmissions,
  houseEmissionsComputed,
  initializeHouseEmissions,
  computeTransportEmissions,
  transportEmissionsComputed,
  initializeTransportEmissions,
  computeFoodEmissions,
  foodEmissionsComputed,
  initializeFoodEmissions,
  computeFlyEmissions,
  flyEmissionsComputed,
  initializeFlyEmissions,
} from '../../commands';
import { computeHouseEmissionsSaga } from '../../usecases/compute-house-emissions';
import { computeTransportEmissionsSaga } from '../../usecases/compute-transport-emissions';
import { computeFoodEmissionsSaga } from '../../usecases/compute-food-emissions';
import { computeFlyEmissionsSaga } from '../../usecases/compute-fly-emissions';

describe('Compute emissions - integration', () => {
  let sagaTester: SagaTester;

  const mockHouseData: HouseT & { consumption: number } & { builtYear: number } = {
    heater: HeaterE.fuelOil,
    built: YearE.old,
    surface: 60,
    consumption: 5000,
    builtYear: 1980,
    type: HouseE.house,
  };

  const houseCarbonFootprint = new HouseEmissions(mockHouseData);

  const mockTransportData: VehicleConsumptionT = {
    distanceByYear: 20000,
    fuel: FuelE.E85,
    mpg: 8,
  };

  const transportCarbonFootprint = new TransportEmissions(mockTransportData);

  const mockFoodData: FoodConsumptionT = {
    alcohol: 7,
    bread: 7,
    cheese: 7,
    fish: 7,
    harvestExotic: 7,
    harvestLocal: 7,
    meatRed: 7,
    meatWhite: 7,
    rice: 7,
    soft: 7,
  };

  const foodCarbonFootprint = new FoodEmissions(mockFoodData);

  const mockFlyData1: FlightI = {
    fromIATA: 'CDG',
    toIATA: 'MYK',
    nbPassengers: 1,
    roundTrip: true,
    seatType: SeatE.business,
  };
  const mockFlyData2: FlightI = {
    fromIATA: 'BAB',
    toIATA: 'CDG',
    nbPassengers: 1,
    roundTrip: false,
    seatType: SeatE.economy,
  };
  const flyCarbonFootprint1 = new FlyEmissions(mockFlyData1);
  const flyCarbonFootprint2 = new FlyEmissions(mockFlyData2);

  beforeEach(() => {
    const initialState: ICarbonState = {
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    };
    sagaTester = new SagaTester({
      initialState,
      reducers: carbonReducer,
    });
  });

  it('Should store correct state if COMPUTE_HOUSE_EMISSIONS', () => {
    const newState = carbonReducer(undefined, {
      type: ICarbonTypes.COMPUTE_HOUSE_EMISSIONS,
      payload: mockHouseData,
    });

    expect(newState).toEqual({
      pending: true,
      house: {
        data: mockHouseData,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if HOUSE_EMISSIONS_COMPUTED', () => {
    sagaTester.start(computeHouseEmissionsSaga);
    sagaTester.dispatch(computeHouseEmissions(mockHouseData));
    sagaTester.dispatch(
      houseEmissionsComputed({
        footprint: houseCarbonFootprint.value,
        average: houseCarbonFootprint.valueAverage,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: mockHouseData,
        footprint: houseCarbonFootprint.value,
        average: houseCarbonFootprint.valueAverage,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_HOUSE_EMISSIONS', () => {
    sagaTester.start(computeHouseEmissionsSaga);
    sagaTester.dispatch(computeHouseEmissions(mockHouseData));
    sagaTester.dispatch(initializeHouseEmissions());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if COMPUTE_TRANSPORT_EMISSIONS', () => {
    const newState = carbonReducer(undefined, {
      type: ICarbonTypes.COMPUTE_TRANSPORT_EMISSIONS,
      payload: mockTransportData,
    });

    expect(newState).toEqual({
      pending: true,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
      },
      transport: {
        data: mockTransportData,
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
      error: null,
    });
  });

  it('Should store correct state if TRANSPORT_EMISSIONS_COMPUTED', () => {
    sagaTester.start(computeTransportEmissionsSaga);
    sagaTester.dispatch(computeTransportEmissions(mockTransportData));
    sagaTester.dispatch(
      transportEmissionsComputed({
        footprint: transportCarbonFootprint.value,
        average: transportCarbonFootprint.valueAverage,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
      },
      transport: {
        data: mockTransportData,
        footprint: transportCarbonFootprint.value,
        average: transportCarbonFootprint.valueAverage,
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
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_TRANSPORT_EMISSIONS', () => {
    sagaTester.start(computeTransportEmissionsSaga);
    sagaTester.dispatch(computeTransportEmissions(mockTransportData));
    sagaTester.dispatch(initializeTransportEmissions());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if COMPUTE_FOOD_EMISSIONS', () => {
    const newState = carbonReducer(undefined, {
      type: ICarbonTypes.COMPUTE_FOOD_EMISSIONS,
      payload: mockFoodData,
    });

    expect(newState).toEqual({
      pending: true,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
      },
      transport: {
        data: null,
        footprint: null,
        average: null,
      },
      food: {
        data: mockFoodData,
        footprint: null,
        average: null,
      },
      fly: {
        data: null,
        footprint: null,
        average: null,
      },
      error: null,
    });
  });

  it('Should store correct state if FOOD_EMISSIONS_COMPUTED', () => {
    sagaTester.start(computeFoodEmissionsSaga);
    sagaTester.dispatch(computeFoodEmissions(mockFoodData));
    sagaTester.dispatch(
      foodEmissionsComputed({
        footprint: foodCarbonFootprint.value,
        average: foodCarbonFootprint.valueAverage,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
      },
      transport: {
        data: null,
        footprint: null,
        average: null,
      },
      food: {
        data: mockFoodData,
        footprint: foodCarbonFootprint.value,
        average: foodCarbonFootprint.valueAverage,
      },
      fly: {
        data: null,
        footprint: null,
        average: null,
      },
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_FOOD_EMISSIONS', () => {
    sagaTester.start(computeFoodEmissionsSaga);
    sagaTester.dispatch(computeFoodEmissions(mockFoodData));
    sagaTester.dispatch(initializeFoodEmissions());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });

  it('Should store correct state if COMPUTE_FLY_EMISSIONS', () => {
    const newState = carbonReducer(undefined, {
      type: ICarbonTypes.COMPUTE_FLY_EMISSIONS,
      payload: [mockFlyData1, mockFlyData2],
    });

    expect(newState).toEqual({
      pending: true,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
        data: [mockFlyData1, mockFlyData2],
        footprint: null,
        average: null,
      },
      error: null,
    });
  });

  it('Should store correct state if FLY_EMISSIONS_COMPUTED', () => {
    sagaTester.start(computeFlyEmissionsSaga);
    sagaTester.dispatch(computeFlyEmissions([mockFlyData1, mockFlyData2]));
    sagaTester.dispatch(
      flyEmissionsComputed({
        footprint: flyCarbonFootprint1.value + flyCarbonFootprint2.value,
        average: flyCarbonFootprint1.valueAverage,
      }),
    );

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
        data: [mockFlyData1, mockFlyData2],
        footprint: flyCarbonFootprint1.value + flyCarbonFootprint2.value,
        average: flyCarbonFootprint1.valueAverage,
      },
      error: null,
    });
  });

  it('Should store correct state if INITIALIZE_FLY_EMISSIONS', () => {
    sagaTester.start(computeFlyEmissionsSaga);
    sagaTester.dispatch(computeFlyEmissions([mockFlyData1, mockFlyData2]));
    sagaTester.dispatch(initializeFlyEmissions());

    expect(sagaTester.getState()).toEqual({
      pending: false,
      house: {
        data: null,
        footprint: null,
        average: null,
        house: null,
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
      error: null,
    });
  });
});
