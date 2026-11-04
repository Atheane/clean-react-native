import { IsDateString, IsDefined, IsEnum, IsInt, Matches, IsString, validate } from 'class-validator';
import { VEHICLE_STATUS } from '../enums';
import { FootprintError } from '../errors';

// pros: value objects check if properties are conform to domain values defined in back-end
// cons: value objects classes are coupled with class-validator library
export class VehicleVO {
  @IsDateString()
  @IsDefined()
  acquisitionDate!: string;

  @Matches(new RegExp(/^[A-Z]{2}[0-9]{3}[A-Z]{2}/))
  @IsString()
  @IsDefined()
  licensePlate!: string;

  @IsInt()
  @IsDefined()
  userId!: number;

  @IsEnum(VEHICLE_STATUS)
  @IsDefined()
  vehicleStatus!: VEHICLE_STATUS;

  private constructor(props: Partial<VehicleVO>) {
    Object.assign(this, props);
  }

  static async create(props: Partial<VehicleVO>): Promise<VehicleVO> {
    const vehicle = new VehicleVO(props);
    await vehicle.validate();
    return vehicle;
  }

  static async validateLicensePlate(licensePlate: string): Promise<void> {
    const partialVehicle = new VehicleVO({ licensePlate });
    const errors = await validate(partialVehicle, {
      skipMissingProperties: true,
      properties: ['licensePlate'],
    });

    const licensePlateErrors = errors.filter((error) => error.property === 'licensePlate');
    if (licensePlateErrors.length > 0) {
      throw new FootprintError.InvalidLicensePlate(licensePlateErrors);
    }
  }

  private async validate(): Promise<void> {
    const errors = await validate(this);

    if (errors.length > 0) {
      const licensePlateErrors = errors.filter((error) => error.property === 'licensePlate');
      if (errors.some((error) => error.property === 'licensePlate')) {
        throw new FootprintError.InvalidLicensePlate(licensePlateErrors);
      }
      const acquisitionDateErrors = errors.filter((error) => error.property === 'acquisitionDate');
      if (errors.some((error) => error.property === 'acquisitionDate')) {
        throw new FootprintError.InvalidVehicleDate(acquisitionDateErrors);
      }
      const vehicleStatusErrors = errors.filter((error) => error.property === 'vehicleStatus');
      if (errors.some((error) => error.property === 'vehicleStatus')) {
        throw new FootprintError.InvalidVehicleStatus(vehicleStatusErrors);
      }
      const userIdErrors = errors.filter((error) => error.property === 'userId');
      if (errors.some((error) => error.property === 'userId')) {
        throw new FootprintError.MissingUserId(userIdErrors);
      }
    }
  }

  get value() {
    return {
      acquisitionDate: this.acquisitionDate,
      licensePlate: this.licensePlate,
      userId: this.userId,
      vehicleStatus: this.vehicleStatus,
    };
  }
}
