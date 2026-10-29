import { IAddHeatersCommand } from '../commands';
import { House } from '../entities';

export interface ICarbonService {
  addHeaters: (command: IAddHeatersCommand) => Promise<House>;
}
