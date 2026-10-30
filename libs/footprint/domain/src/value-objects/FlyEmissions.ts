import { FlightI, FlightDataE, Flight } from '@bank/carbon-weight/dist';
import { FootprintError } from '../errors';

export class FlyEmissions {
  private props: FlightI;
  private calculator: Flight;
  private average: number;
  private emission: number;

  constructor(props: FlightI) {
    // initialize
    this.average = 0;
    this.emission = 0;
    this.props = props;
    // get calculator
    this.calculator = Flight.build(FlightDataE.ADEME_2022);

    // if not flights, zero emissions
    if (!props) {
      return;
    }
    // validate data
    this.validate(props);
    //compute
    this.calculateAverage();
    this.calculate();
  }

  private validate(flight: FlightI) {
    if (!flight.fromIATA || !flight.toIATA || !flight.nbPassengers) {
      throw new FootprintError.InvalidFlyProps();
    }
  }

  private calculateAverage(): void {
    this.average = this.calculator.getEmissionAvg();
  }

  private calculate(): void {
    this.emission = this.calculator.getEmissionEstimated(this.props, 1);
  }

  get value(): number {
    return this.emission;
  }

  get valueAverage(): number {
    return this.average;
  }
}
