import { House, Transport } from '../aggregates-root';
import { IAddHeatersCommand, IAddVehiclesCommand, IAddWorksCommand } from '../commands';

export interface IFootprintService {
  addHeaters: (command: IAddHeatersCommand) => Promise<House>;
  addWorks: (command: IAddWorksCommand) => Promise<House>;
  addVehicles: (command: IAddVehiclesCommand) => Promise<Transport>;
}
