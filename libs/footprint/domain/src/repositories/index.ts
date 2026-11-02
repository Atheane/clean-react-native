import {
  ICreateFootprintCommand,
  ICreateHouseCommand,
  IAddHeaterCommand,
  IAddWorkCommand,
  ICreateTransportCommand,
  IAddVehicleCommand,
} from '../commands';
import { ISearchHouseQuery, ISearchTransportQuery } from '../queries';
import { Transport, House } from '../aggregates-root';
import { Footprint, Work, Heater, Vehicle } from '../entities';

export interface IFootprintRepository {
  createFootprint: (command: ICreateFootprintCommand) => Promise<Footprint>;
  getFootprint: () => Promise<Footprint | void>;
  createHouse: (command: ICreateHouseCommand) => Promise<House>;
  searchHouse: (query: ISearchHouseQuery) => Promise<House | void>;
  addHeater: (command: IAddHeaterCommand) => Promise<Heater>;
  createTransport: (command: ICreateTransportCommand) => Promise<Transport>;
  searchTransport: (query: ISearchTransportQuery) => Promise<Transport | void>;
  addWork: (command: IAddWorkCommand) => Promise<Work>;
  addVehicle: (command: IAddVehicleCommand) => Promise<Vehicle>;
}
