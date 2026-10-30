import { IAddHeatersCommand } from '../commands';
import { House } from '../entities';

export interface IFootprintService {
  addHeaters: (command: IAddHeatersCommand) => Promise<House>;
}
