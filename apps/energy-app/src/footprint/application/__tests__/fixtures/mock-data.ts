import {
  HEATER_TYPE,
  HEATER_USAGE,
  VEHICLE_STATUS,
  Transport,
  HOUSE_WORK_TYPE,
  House,
  HOUSE_STATUS,
} from '@clean-rn/footprint/domain';
import { User } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';

import { HouseT, VehicleConsumptionT, FoodConsumptionT, FlightI } from '@bank/carbon-weight/dist';
import { HeaterE, HouseE, YearE } from '@bank/carbon-weight/dist/house/types';
import { FuelE } from '@bank/carbon-weight/dist/vehicle/types';
import { SeatE } from '@bank/carbon-weight/dist/flight/types';
import {
  FoodEmissions,
  HouseEmissions,
  TransportEmissions,
  FlyEmissions,
} from '@clean-rn/footprint/domain';
import { IHouseholdProps } from '../../../presentation/types';

export const mockHouseholdData: IHouseholdProps = {
  adultNumber: 2,
  childNumber: 1,
};

export const mockHouseData: HouseT & { consumption: number } & { builtYear: number } = {
  heater: HeaterE.fuelOil,
  built: YearE.old,
  surface: 60,
  consumption: 5000,
  builtYear: 1980,
  type: HouseE.house,
};

export const houseCarbonFootprint = new HouseEmissions(mockHouseData);

export const mockTransportData: VehicleConsumptionT = {
  distanceByYear: 20000,
  fuel: FuelE.E85,
  mpg: 8,
};

export const transportCarbonFootprint = new TransportEmissions(mockTransportData);

export const mockFlyData1: FlightI = {
  fromIATA: 'CDG',
  toIATA: 'MYK',
  nbPassengers: 1,
  roundTrip: true,
  seatType: SeatE.business,
};
export const mockFlyData2: FlightI = {
  fromIATA: 'BAB',
  toIATA: 'CDG',
  nbPassengers: 1,
  roundTrip: false,
  seatType: SeatE.economy,
};

export const flyCarbonFootprint1 = new FlyEmissions(mockFlyData1);
export const flyCarbonFootprint2 = new FlyEmissions(mockFlyData2);

export const mockFoodData: FoodConsumptionT = {
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

export const foodCarbonFootprint = new FoodEmissions(mockFoodData);

export const mockHeaterData = {
  usage: HEATER_USAGE.MAIN,
  heatType: HEATER_TYPE.ELECTRIC,
  installationYear: 2013,
  previousHeatType: HEATER_TYPE.ELECTRIC,
  hasBeenChanged: true,
};

export const mockHeaterUser = User.Create({
  id: 100000352,
  properties: {
    email: new Email('test@test.com'),
  },
});

export const mockVehicleData = {
  userId: 100000352,
  licensePlate: 'DB404PM',
  hasBeenChanged: false,
  acquisitionYear: 2020,
  vehicleStatus: VEHICLE_STATUS.OWNED,
};

export const mockTransport = Transport.Create({
  transportId: 'transportId',
});

export const mockWorkData = {
  worksType: [HOUSE_WORK_TYPE.WINDOW, HOUSE_WORK_TYPE.WALL],
  workDate: 2022,
};

export const mockHeaterHouse = House.Create({
  houseId: 'houseId',
  houseStatus: HOUSE_STATUS.OCCUPIED,
  userId: '100000352',
});
