import { House } from '../entities';
import { HOUSE_STATUS } from '../enums';
import { HeaterVO } from '../value-objects';

export type IAddHeaterCommand = {
  house: House;
  heater: HeaterVO;
};

export type IAddHeatersCommand = {
  house: House;
  heaters: HeaterVO[];
};

export type ICreateHouseCommand = {
  userId: string;
  houseStatus: HOUSE_STATUS;
};
