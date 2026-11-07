/* eslint-disable  @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { Energy } from '@clean-rn/energy/domain';
import { EnergyRepositoryFactory } from '@clean-rn/energy/infrastructure';

import { getConsumptionSaga, getConsumptionGenerator } from '../../usecases/get-energy-consumption';
import { IEnergyTypes, initializeEnergy } from '../../commands';
import { selectEnergy } from '../../state-management/selectors';

import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { createMockHttpConnection, mockInfrastructure } from '../helpers/setup';
import { mockUser, mockConsumptions, mockPriceComfortMonthly } from '../fixtures/mock-data';

describe('GetConsumption - usecase', () => {
  let httpConnection: HttpConnection;
  let mockRepository: any;
  let mockEnergy: any;

  beforeEach(() => {
    httpConnection = createMockHttpConnection();
    mockInfrastructure();

    // Mock du repository
    mockRepository = {
      getConsumptions: jest.fn(),
      getPriceComfortMonthly: jest.fn(),
    };

    // Mock de l'objet Energy
    mockEnergy = {
      updateConsumptions: jest.fn(),
      addPriceComfortMonthly: jest.fn(),
    };

    // Mock du factory
    jest.spyOn(EnergyRepositoryFactory, 'getRepository').mockReturnValue(mockRepository);

    // Mock de Energy.Restore
    jest.spyOn(Energy, 'Restore').mockReturnValue(mockEnergy);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should wait for GET_CONSUMPTIONS action and call getConsumptionGenerator, should be done on next iteration', () => {
    const genObject = getConsumptionSaga(httpConnection);
    expect(genObject.next().value).toEqual(
      takeEvery(IEnergyTypes.GET_CONSUMPTIONS, getConsumptionGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('Should get consumptions and price comfort monthly data successfully', () => {
    const mockReduxEnergy = { userId: mockUser.id };

    mockRepository.getConsumptions.mockResolvedValue(mockConsumptions);
    mockRepository.getPriceComfortMonthly.mockResolvedValue(mockPriceComfortMonthly);

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockReduxEnergy)
      .call([mockRepository, mockRepository.getConsumptions])
      .next(mockConsumptions)
      .call([mockRepository, mockRepository.getPriceComfortMonthly])
      .next(mockPriceComfortMonthly)
      .next()
      .isDone();

    // Vérifier que Energy.Restore a été appelé avec les bonnes données
    expect(Energy.Restore).toHaveBeenCalledWith(mockReduxEnergy);

    // Vérifier que les méthodes de l'objet Energy ont été appelées
    expect(mockEnergy.updateConsumptions).toHaveBeenCalledWith(mockConsumptions);
    expect(mockEnergy.addPriceComfortMonthly).toHaveBeenCalledWith(mockPriceComfortMonthly);

    // Vérifier que le repository a été récupéré
    expect(EnergyRepositoryFactory.getRepository).toHaveBeenCalledWith(httpConnection);
  });

  it('Should handle empty consumptions and price comfort data', () => {
    const mockReduxEnergy = { userId: mockUser.id };
    const emptyConsumptions: any[] = [];
    const emptyPriceComfort: any[] = [];

    mockRepository.getConsumptions.mockResolvedValue(emptyConsumptions);
    mockRepository.getPriceComfortMonthly.mockResolvedValue(emptyPriceComfort);

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockReduxEnergy)
      .call([mockRepository, mockRepository.getConsumptions])
      .next(emptyConsumptions)
      .call([mockRepository, mockRepository.getPriceComfortMonthly])
      .next(emptyPriceComfort)
      .next()
      .isDone();

    // Vérifier que les méthodes ont été appelées même avec des données vides
    expect(mockEnergy.updateConsumptions).toHaveBeenCalledWith(emptyConsumptions);
    expect(mockEnergy.addPriceComfortMonthly).toHaveBeenCalledWith(emptyPriceComfort);
  });

  it('Should call showUnknownError action if error occurs during getConsumptions', () => {
    const error = new Error('Network error during getConsumptions');

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .throw(error)
      .put(initializeEnergy())
      .next()
      .put(showUnknownError(error))
      .next()
      .isDone();
  });

  it('Should call showUnknownError action if error occurs during getPriceComfortMonthly', () => {
    const mockReduxEnergy = { userId: mockUser.id };
    const error = new Error('Network error during getPriceComfortMonthly');

    mockRepository.getConsumptions.mockResolvedValue(mockConsumptions);

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .select(selectEnergy)
      .next(mockReduxEnergy)
      .call([mockRepository, mockRepository.getConsumptions])
      .next(mockConsumptions)
      .call([mockRepository, mockRepository.getPriceComfortMonthly])
      .throw(error)
      .put(initializeEnergy())
      .next()
      .put(showUnknownError(error))
      .next()
      .isDone();
  });

  it('Should call showUnknownError action if ensureTokenRefreshed fails', () => {
    const error = new Error('Token refresh failed');

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .throw(error)
      .put(initializeEnergy())
      .next()
      .put(showUnknownError(error))
      .next()
      .isDone();
  });

  it('Should handle unknown error type', () => {
    const unknownError = 'String error instead of Error object';

    testSaga(getConsumptionGenerator, httpConnection)
      .next()
      .throw(unknownError)
      .put(initializeEnergy())
      .next()
      .put(showUnknownError(unknownError as Error))
      .next()
      .isDone();
  });
});
