import { HouseDataE, House, HouseT, HouseHeaterE as HeaterE } from '@bank/carbon-weight/dist';
import { CarbonError } from '../errors';

export class HouseEmissions {
  private props: HouseT & { consumption: number };
  private calculator: House;
  private average: number;
  private emission: number;

  constructor(props: HouseT & { consumption: number }) {
    if (!this.validate(props)) {
      throw new CarbonError.InvalidHouseProps();
    }
    // initialize
    this.average = 0;
    this.emission = 0;
    this.props = props;
    // get calculator
    this.calculator = House.build(HouseDataE.BANK_2022);
    //compute
    this.computeAverage();
    this.compute();
  }

  private validate(props: HouseT & { consumption: number }): boolean {
    if (!props.heater) {
      return false;
    } else if (props.heater === HeaterE.gas && (!props.surface || !props.built || !props.type)) {
      return false;
    } else if (
      [HeaterE.coal, HeaterE.fuelOil, HeaterE.propane].includes(props.heater) &&
      !props.consumption
    ) {
      return false;
    }
    return true;
  }

  private computeAverage(): void {
    this.average = this.calculator.getEmissionAvg();
  }

  private compute(): void {
    if (this.props.heater === HeaterE.gas) {
      this.emission = this.calculator.getEmissionEstimated(this.props);
    } else if ([HeaterE.coal, HeaterE.fuelOil, HeaterE.propane].includes(this.props.heater)) {
      this.emission = this.calculator.getEmissionConsumed([this.props.consumption], this.props.heater);
    } else {
      this.emission = 0;
    }
  }

  get value(): number {
    return this.emission;
  }

  get valueAverage(): number {
    return this.average;
  }
}
