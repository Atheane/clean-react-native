import { VehicleDataE, Vehicle, VehicleConsumptionT, VehicleFuelE as FuelE } from '@bank/carbon-weight/dist';
import { CarbonError } from '../errors';

export class TransportEmissions {
  private props: VehicleConsumptionT;
  private calculator: Vehicle;
  private average: number;
  private emission: number;

  constructor(props: VehicleConsumptionT) {
    if (!this.validate(props)) {
      throw new CarbonError.InvalidTransportProps();
    }
    // initialize
    this.average = 0;
    this.emission = 0;
    this.props = props;
    // get calculator
    this.calculator = Vehicle.build(VehicleDataE.BANK_2022);
    //compute
    this.calculateAverage();
    this.calculate();
  }

  private validate(props: VehicleConsumptionT): boolean {
    if (!props.fuel) {
      return false;
    } else if (props.fuel !== FuelE.electric && (!props.mpg || !props.distanceByYear)) {
      return false;
    }
    return true;
  }

  private calculateAverage(): void {
    this.average = this.calculator.getEmissionAvg();
  }

  private calculate(): void {
    if (this.props.fuel !== FuelE.electric) {
      this.emission = this.calculator.getEmissionConsumed(this.props);
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
