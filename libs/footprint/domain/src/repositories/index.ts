import { ISearchHouseQuery } from '../queries';
import { ICreateHouseCommand, IAddHeaterCommand, ICreateFootprintCommand } from '../commands';
import { House, Footprint } from '../entities';

export interface IFootprintRepository {
  createFootprint: (command: ICreateFootprintCommand) => Promise<Footprint>;
  createHouse: (command: ICreateHouseCommand) => Promise<House>;
  searchHouse: (query: ISearchHouseQuery) => Promise<House | void>;
  addHeater: (command: IAddHeaterCommand) => Promise<House>;
}
