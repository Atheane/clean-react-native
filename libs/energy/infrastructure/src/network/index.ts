import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  IEnergyRepository,
  ISensor,
  MeasurementVO,
  PriceComfortVO,
  Quiz,
  SENSOR_TYPE,
  ICheckAnswerCommand,
  IEnergyConsumption,
  PRICE_COMFORT_TYPE,
} from '@clean-rn/energy/domain';
import {
  IMeasurementsDto,
  IPriceComfortDto,
  IQuizDto,
  IRewardsStatsDto,
  ISensorDto,
  SENSOR_TYPE_DTO,
  IAnswerQuizDto,
  IEnergyConsumptionDto,
  PRICE_COMFORT_DATA_GRANULARITY_DTO,
  PRICE_COMFORT_TYPE_DTO,
} from '../dto';
import {
  SensorMapper,
  MeasurementMapper,
  PriceComfortMapper,
  QuizMapper,
  ConsumptionMapper,
} from '../mappers';

const generateMonthsArray = (): string[] => {
  const months: string[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() retourne 0-11

  const startYear = 2023;
  const startMonth = 1;

  for (let year = startYear; year <= currentYear; year++) {
    const firstMonth = year === startYear ? startMonth : 1;
    const lastMonth = year === currentYear ? currentMonth : 12;

    for (let month = firstMonth; month <= lastMonth; month++) {
      const monthStr = month.toString().padStart(2, '0');
      months.push(`${year}${monthStr}`);
    }
  }

  return months;
};

export class EnergyApi implements IEnergyRepository {
  private static instance: EnergyApi | null = null;
  private connection: HttpConnection;

  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getSensors = this.getSensors.bind(this);
    this.getQuiz = this.getQuiz.bind(this);
    this.getMeasurement = this.getMeasurement.bind(this);
    this.getConsumptions = this.getConsumptions.bind(this);
    this.getPriceComfort = this.getPriceComfort.bind(this);
    this.getPriceComfortMonthly = this.getPriceComfortMonthly.bind(this);
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
    } else if (sensorType === SENSOR_TYPE.TEMPERATURE_EXT) {
      sensorTypeDto = SENSOR_TYPE_DTO.TEMPERATURE_EXT;
    } else if (sensorType === SENSOR_TYPE.HUMIDITY_EXT) {
      sensorTypeDto = SENSOR_TYPE_DTO.HUMIDITY_EXT;
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

  async getQuiz(locale: string): Promise<Quiz | null> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/quiz`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const quizDtos: IQuizDto[] = await response.json();
    return QuizMapper.toDomain(quizDtos[0], locale);
  }

  async checkAnswer(command: ICheckAnswerCommand): Promise<boolean> {
    const cmdDto = {
      quizId: parseInt(command.quizId),
      answerIdx: command.answerIdx,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/quiz/answer`,
      this.connection.options(IHttpVerb.POST, cmdDto),
    );
    await this.connection.handleError(response);
    const answerQuizDto: IAnswerQuizDto = await response.json();
    return answerQuizDto.answerStatus !== 'FAILED';
  }

  async getConsumptions(): Promise<IEnergyConsumption[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/energy-app/core/consumption`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const consoDtos: IEnergyConsumptionDto[] = await response.json();
    return ConsumptionMapper.toDomain(consoDtos);
  }

  async getPriceComfortMonthly(): Promise<PriceComfortVO[]> {
    const yearMonths = generateMonthsArray();
    const pcMonths: Promise<PriceComfortVO>[] = [];
    const type = PRICE_COMFORT_TYPE_DTO.ALL;
    const temperature = 18;
    yearMonths.forEach(async (yearMonth: string) => {
      try {
        const year = parseInt(yearMonth.substring(0, 4));
        const month = parseInt(yearMonth.substring(4, 6)) - 1; // valeur attendue: de 0 à 11, 12 => BAD_REQUEST
        const params = `year=${year}&month=${month}&type=${type}&temperature=${temperature}`;
        const response = await fetch(
          `${this.connection.baseUrl}/app/energy-app/core/comfort-price-month?${params}`,
          this.connection.options(IHttpVerb.GET),
        );
        await this.connection.handleError(response);
        const pcDTOs: IPriceComfortDto[] = await response.json();

        pcDTOs.forEach((pc: IPriceComfortDto) => {
          pcMonths.push(PriceComfortMapper.toDomain(pc));
        });
      } catch (error: unknown) {
        console.log(`Erreur Comfort Price for month ${yearMonth}`);
        throw error;
      }
    });
    return Promise.all(pcMonths);
  }
}
