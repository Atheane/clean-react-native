/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { FootprintError, Footprint, FOOTPRINT_UNIT } from '@clean-rn/footprint/domain';

import { footprintReducer } from '../../state-management';
import {
  footprintNotFound,
  IFootprintTypes,
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
import { mapHouseholdPropsToDomain } from '../../mappers';
import { computeHouseEmissionsSaga } from '../../usecases/compute-house-emissions';
import { computeTransportEmissionsSaga } from '../../usecases/compute-transport-emissions';
import { computeFoodEmissionsSaga } from '../../usecases/compute-food-emissions';
import { computeFlyEmissionsSaga } from '../../usecases/compute-fly-emissions';
import {
  mockHouseholdData,
  mockHouseData,
  mockTransportData,
  mockFlyData1,
  mockFlyData2,
  mockFoodData,
  houseCarbonFootprint,
  transportCarbonFootprint,
  foodCarbonFootprint,
  flyCarbonFootprint1,
  flyCarbonFootprint2,
} from '../fixtures/mock-data';
import { initialFootprintState } from '../fixtures/states';

describe('Footprint - integration', () => {
  let sagaTester: SagaTester;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: initialFootprintState,
      reducers: footprintReducer,
    });
  });

  describe('Footprint management', () => {
    it('Should store correct state if CREATE_FOOTPRINT action is dispatched', async () => {
      const newState = footprintReducer(undefined, {
        type: IFootprintTypes.CREATE_FOOTPRINT,
        payload: mockHouseholdData,
      });

      expect(newState).toEqual({
        pending: true,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      });
    });

    it('Should store correct state if FOOTPRINT_CREATED action is dispatched', async () => {
      const householdVO = await mapHouseholdPropsToDomain(mockHouseholdData);
      const footprint = Footprint.Create({
        household: householdVO,
        userId: 'userId',
        unit: FOOTPRINT_UNIT.CO2,
        startDate: new Date(),
        endDate: new Date(),
      });
      const newState = footprintReducer(undefined, {
        type: IFootprintTypes.FOOTPRINT_CREATED,
        payload: footprint,
      });

      // Ne vérifier que l'état footprint
      expect(newState).toEqual({
        pending: false,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        house: null,
        footprint: footprint,
        transport: null,
        error: null,
      });
    });

    it('Should store correct state if FOOTPRINT_NOT_CREATED', async () => {
      const newState = footprintReducer(undefined, {
        type: IFootprintTypes.FOOTPRINT_NOT_CREATED,
        payload: new FootprintError.InvalidAdultNumber(),
      });
      expect(newState).toEqual({
        pending: false,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: new FootprintError.InvalidAdultNumber(),
      });
    });

    it('Should store correct state if GET_FOOTPRINT is dispatched', () => {
      const newState = footprintReducer(undefined, {
        type: IFootprintTypes.GET_FOOTPRINT,
      });

      expect(newState).toEqual({
        pending: true,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      });
    });

    it('Should store correct state when FOOTPRINT_NOTFOUND action is dispatched', () => {
      // Test direct du reducer
      const newState = footprintReducer(undefined, footprintNotFound());

      expect(newState).toEqual({
        pending: false,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      });
    });

    it('Should store correct state if INITIALIZE_FOOTPRINT', async () => {
      const newState = footprintReducer(undefined, {
        type: IFootprintTypes.INITIALIZE_FOOTPRINT,
      });
      expect(newState).toEqual({
        pending: false,
        estimate: {
          house: { data: null, footprint: null, average: null },
          transport: { data: null, footprint: null, average: null },
          food: { data: null, footprint: null, average: null },
          fly: { data: null, footprint: null, average: null },
        },
        footprint: null,
        house: null,
        transport: null,
        error: null,
      });
    });
  });
  describe('Emissions computation', () => {
    describe('House emissions', () => {
      it('Should store correct state if COMPUTE_HOUSE_EMISSIONS', () => {
        const newState = footprintReducer(undefined, {
          type: IFootprintTypes.COMPUTE_HOUSE_EMISSIONS,
          payload: mockHouseData,
        });

        expect(newState).toEqual({
          pending: true,
          estimate: {
            house: {
              data: mockHouseData,
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
          house: null,
          footprint: null,
          transport: null,
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
          estimate: {
            house: {
              data: mockHouseData,
              footprint: houseCarbonFootprint.value,
              average: houseCarbonFootprint.valueAverage,
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
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });

      it('Should store correct state if INITIALIZE_HOUSE_EMISSIONS', () => {
        sagaTester.start(computeHouseEmissionsSaga);
        sagaTester.dispatch(computeHouseEmissions(mockHouseData));
        sagaTester.dispatch(initializeHouseEmissions());

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
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });
    });

    describe('Transport emissions', () => {
      it('Should store correct state if COMPUTE_TRANSPORT_EMISSIONS', () => {
        const newState = footprintReducer(undefined, {
          type: IFootprintTypes.COMPUTE_TRANSPORT_EMISSIONS,
          payload: mockTransportData,
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
          },
          house: null,
          footprint: null,
          transport: null,
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
          estimate: {
            house: {
              data: null,
              footprint: null,
              average: null,
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
          },
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });

      it('Should store correct state if INITIALIZE_TRANSPORT_EMISSIONS', () => {
        sagaTester.start(computeTransportEmissionsSaga);
        sagaTester.dispatch(computeTransportEmissions(mockTransportData));
        sagaTester.dispatch(initializeTransportEmissions());

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
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });
    });

    describe('Food emissions', () => {
      it('Should store correct state if COMPUTE_FOOD_EMISSIONS', () => {
        const newState = footprintReducer(undefined, {
          type: IFootprintTypes.COMPUTE_FOOD_EMISSIONS,
          payload: mockFoodData,
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
              data: mockFoodData,
              footprint: null,
              average: null,
            },
            fly: {
              data: null,
              footprint: null,
              average: null,
            },
          },
          house: null,
          footprint: null,
          transport: null,
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
              data: mockFoodData,
              footprint: foodCarbonFootprint.value,
              average: foodCarbonFootprint.valueAverage,
            },
            fly: {
              data: null,
              footprint: null,
              average: null,
            },
          },
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });

      it('Should store correct state if INITIALIZE_FOOD_EMISSIONS', () => {
        sagaTester.start(computeFoodEmissionsSaga);
        sagaTester.dispatch(computeFoodEmissions(mockFoodData));
        sagaTester.dispatch(initializeFoodEmissions());

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
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });
    });

    describe('Fly emissions', () => {
      it('Should store correct state if COMPUTE_FLY_EMISSIONS', () => {
        const newState = footprintReducer(undefined, {
          type: IFootprintTypes.COMPUTE_FLY_EMISSIONS,
          payload: [mockFlyData1, mockFlyData2],
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
              data: [mockFlyData1, mockFlyData2],
              footprint: null,
              average: null,
            },
          },
          house: null,
          footprint: null,
          transport: null,
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
              data: [mockFlyData1, mockFlyData2],
              footprint: flyCarbonFootprint1.value + flyCarbonFootprint2.value,
              average: flyCarbonFootprint1.valueAverage,
            },
          },
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });

      it('Should store correct state if INITIALIZE_FLY_EMISSIONS', () => {
        sagaTester.start(computeFlyEmissionsSaga);
        sagaTester.dispatch(computeFlyEmissions([mockFlyData1, mockFlyData2]));
        sagaTester.dispatch(initializeFlyEmissions());

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
          house: null,
          footprint: null,
          transport: null,
          error: null,
        });
      });
    });
  });
});
