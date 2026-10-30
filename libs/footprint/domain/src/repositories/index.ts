import { ISearchHouseQuery } from '../queries';
import { ICreateHouseCommand, IAddHeaterCommand } from '../commands';
import { House } from '../entities';

export interface IFootprintRepository {
  createHouse: (command: ICreateHouseCommand) => Promise<House>;
  searchHouse: (query: ISearchHouseQuery) => Promise<House | void>;
  addHeater: (command: IAddHeaterCommand) => Promise<House>;
}
