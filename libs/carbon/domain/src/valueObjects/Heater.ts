import { IHeaterProps } from '../types';
import { CarbonError } from '../errors';

export class Heater {
  private props: IHeaterProps;

  constructor(props: IHeaterProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props?: IHeaterProps): void {
    if (!props) {
      throw new CarbonError.MissingHeaterProps();
    } else if (!props.heatType) {
      throw new CarbonError.MissingHeaterType(props.usage);
    } else if (!props.installationYear) {
      throw new CarbonError.MissingHeaterInstallationYear(props.usage);
    } else if (props.installationYear >= 2010 && !props.previousHeatType) {
      throw new CarbonError.MissingPreviousHeaterType(props.usage);
    }
    return;
  }

  get value(): Heater {
    return this;
  }
}
