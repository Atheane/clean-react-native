import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  IEnergyRepository,
  ISensor,
  MeasurementVO,
  PriceComfortVO,
  SENSOR_TYPE,
} from '@clean-rn/energy/domain';
import {
  IMeasurementsDto,
  IPriceComfortDto,
  IRewardDto,
  IRewardsStatsDto,
  ISensorDto,
  SENSOR_TYPE_DTO,
} from '../dto';
import { SensorMapper, MeasurementMapper, PriceComfortMapper } from '../mappers';

export class EnergyApi implements IEnergyRepository {
  private static instance: EnergyApi | null = null;
  private connection: HttpConnection;

  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getSensors = this.getSensors.bind(this);
    this.getMeasurement = this.getMeasurement.bind(this);
  }

  public static getInstance(httpConnection: HttpConnection): EnergyApi {
    if (!this.instance) {
      this.instance = new EnergyApi(httpConnection);
    }
    return this.instance;
  }

  async getSensors(): Promise<ISensor[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/sensor`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const sensorDtos: ISensorDto[] = await response.json();
    const uniqueSensorDtos = sensorDtos.filter(
      (dto, index, self) =>
        index ===
        self.findIndex(
          (d) =>
            d.measurment === dto.measurment &&
            d.roomNumber === dto.roomNumber &&
            d.startDate === dto.startDate,
        ),
    ); // filter out duplicates

    const sensors = await Promise.all(
      uniqueSensorDtos.map(async (sensor: ISensorDto) => {
        try {
          return await SensorMapper.toDomain(sensor);
        } catch (error) {
          return undefined;
        }
      }),
    );

    return sensors.filter((sensor): sensor is ISensor => sensor !== undefined); // filter out sensorType others than SENSOR_TYPE.TEMPERATURE
  }

  async getMeasurement(sensorType: SENSOR_TYPE): Promise<MeasurementVO> {
    let sensorTypeDto: SENSOR_TYPE_DTO | undefined;
    if (sensorType === SENSOR_TYPE.CO2) {
      sensorTypeDto = SENSOR_TYPE_DTO.CO2;
    } else if (sensorType === SENSOR_TYPE.HUMIDITY) {
      sensorTypeDto = SENSOR_TYPE_DTO.HUMIDITY;
    } else if (sensorType === SENSOR_TYPE.TEMPERATURE) {
      sensorTypeDto = SENSOR_TYPE_DTO.TEMPERATURE;
    }
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/sensor/${sensorTypeDto}`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const measurementDto: IMeasurementsDto = await response.json();
    const measurement = await MeasurementMapper.toDomain(measurementDto);
    return measurement;
  }

  async getPriceComfort(): Promise<PriceComfortVO[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/core/comfort-price?period=BASELINE`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const priceComfortDtos: IPriceComfortDto[] = await response.json();
    const priceComforts: PriceComfortVO[] = await Promise.all(
      priceComfortDtos.map(async (priceComfortDto: IPriceComfortDto) => {
        return await PriceComfortMapper.toDomain(priceComfortDto);
      }),
    );
    return priceComforts;
  }

  async getRewards(): Promise<number> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/reward/stats`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const rewardsStatsDtos: IRewardsStatsDto = await response.json();
    return rewardsStatsDtos.rewardTotal;
  }
}
