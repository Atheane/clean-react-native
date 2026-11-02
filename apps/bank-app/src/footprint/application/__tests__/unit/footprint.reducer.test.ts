/* eslint-disable  @typescript-eslint/no-explicit-any */
import SagaTester from 'redux-saga-tester';

import { FootprintError, Footprint, FOOTPRINT_UNIT } from '@clean-rn/footprint/domain';

import { footprintReducer, IFootprintState } from '../../state-management';
import { footprintNotFound, IFootprintTypes } from '../../commands';
import { mapHouseholdPropsToDomain } from '../../mappers';
import { IHouseholdProps } from '../../presentation/types';

describe('Footprint - integration', () => {
  const mockData: IHouseholdProps = {
    adultNumber: 2,
    childNumber: 1,
  };

  let sagaTester: SagaTester;

  beforeEach(() => {
    const initialState: IFootprintState = {
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
    };

    sagaTester = new SagaTester({
      initialState,
      reducers: footprintReducer,
    });
  });

  it('Should store correct state if CREATE_FOOTPRINT action is dispatched', async () => {
    const newState = footprintReducer(undefined, {
      type: IFootprintTypes.CREATE_FOOTPRINT,
      payload: mockData,
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
    const householdVO = await mapHouseholdPropsToDomain(mockData);
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
