import { House, Transport } from '../aggregates-root';
import { HOUSE_STATUS } from '../enums';
import { HeaterVO, HouseholdVO, WorkVO, VehicleVO } from '../value-objects';

// Footprint
export type ICreateFootprintCommand = {
  userId: string;
  household: HouseholdVO;
};

// House
export type ICreateHouseCommand = {
  userId: string;
  houseStatus: HOUSE_STATUS;
};

export type IAddHeaterCommand = {
  houseId: string;
  heaterVO: HeaterVO;
};

export type IAddHeatersCommand = {
  house: House;
  heatersVO: HeaterVO[];
};

export type IAddWorkCommand = {
  houseId: string;
  workVO: WorkVO;
};

export type IAddWorksCommand = {
  house: House;
  worksVO: WorkVO[];
};

// Transport
export type ICreateTransportCommand = {
  userId: string;
};

export type IAddVehicleCommand = {
  vehicleVO: VehicleVO;
};

export type IAddVehiclesCommand = {
  transport: Transport;
  vehiclesVO: VehicleVO[];
};
