import { FoodConsumptionT, FoodE, Food, FoodDataE } from '@bank/carbon-weight/dist';
import { FootprintError } from '../errors';

export class FoodEmissions {
  private props: FoodConsumptionT;
  private calculator: Food;
  private average: number;
  private emission: number;

  constructor(props: FoodConsumptionT) {
    if (!this.validate(props)) {
      throw new FootprintError.InvalidFoodProps();
    }
    // initialize
    this.average = 0;
    this.emission = 0;
    this.props = props;
    // get calculator
    this.calculator = Food.build(FoodDataE.ADEME_2022);
    //compute
    this.calculateAverage();
    this.calculate();
  }

  private validate(props: FoodConsumptionT): boolean {
    Object.values(FoodE).map((key: FoodE) => {
      if (!props[key]) {
        return false;
      }
      return true;
    });
    return true;
  }

  private calculateAverage(): void {
    this.average = this.calculator.getEmissionAvg().emission + this.calculator.getEmissionAvg().waste;
  }

  private calculate(): void {
    this.emission =
      this.calculator.getEmissionEstimated(this.props).emission +
      this.calculator.getEmissionEstimated(this.props).waste;
  }

  get value(): number {
    return this.emission;
  }

  get valueAverage(): number {
    return this.average;
  }
}
