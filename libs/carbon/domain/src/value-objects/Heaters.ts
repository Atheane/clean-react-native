import { IHeaterProps, IHeatersProps } from '../types';
import { CarbonError } from '../errors';
import { Heater } from './Heater';

export class Heaters {
  private props: IHeaterProps[];
  private heaters: Heater[];

  constructor(props: IHeatersProps) {
    this.props = props;
    const mainHeaterProps = props.heaters.find((heater: IHeaterProps) => heater.usage === 'MAIN');
    const sanitaryHeaterProps = props.heaters.find((heater: IHeaterProps) => heater.usage === 'SANITARY');
    const mainHeater = new Heater(mainHeaterProps as IHeaterProps);
    const sanitaryHeater = new Heater(sanitaryHeaterProps as IHeaterProps);
    const heaters = [mainHeater, sanitaryHeater];
    this.validate(heaters);
    this.heaters = heaters;
  }

  private validate(heaters: Heater[]): void {
    if (!heaters) {
      throw new CarbonError.MissingHeater();
    } else if (this.heaters.length < 2) {
      throw new CarbonError.MissingHeater();
    }
    return;
  }

  get value(): Heater[] {
    return this.heaters;
  }
}
