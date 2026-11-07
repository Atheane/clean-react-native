import {
  IEnergyRepository,
  ISensor,
  MeasurementVO,
  PriceComfortVO,
  Quiz,
  SENSOR_TYPE,
  ICheckAnswerCommand,
  IEnergyConsumption,
} from '@clean-rn/energy/domain';
import { IPriceComfortDto, ISensorDto } from '@clean-rn/energy/infrastructure';

// Import des fixtures préalablement générées
import getSensorsFixture from './fixtures/get-sensors.json';
import getMeasurementTemperatureFixture from './fixtures/get-measurement-temperature.json';
import getMeasurementHumidityFixture from './fixtures/get-measurement-humidity.json';
import getMeasurementCO2Fixture from './fixtures/get-measurement-co2-error404.json';
import getPriceComfortFixture from './fixtures/get-price-comfort.json';
import getRewardsFixture from './fixtures/get-rewards.json';
import getQuizFixture from './fixtures/get-quiz.json';
import getConsumptions from './fixtures/get-consumptions.json';
import getpc202301 from './fixtures/get-price-comfort-monthly-2023-01.json';

// Import des mappers pour transformer les fixtures en objets domaine
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

export class EnergyRepositoryInMemory implements IEnergyRepository {
  private static instance: EnergyRepositoryInMemory | null = null;
  private lastAnsweredQuizDate: Date | null = null;
  private rewards = 0;
  private readonly delayMs: number = 2000; // Délai de 800ms pour simuler une API

  private constructor() {
    // Rien à initialiser de manière asynchrone
  }

  // Méthode utilitaire pour simuler un délai réseau
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delayMs));
  }

  public static getInstance(): EnergyRepositoryInMemory {
    if (!this.instance) {
      this.instance = new EnergyRepositoryInMemory();
    }
    return this.instance;
  }

  async getSensors(): Promise<ISensor[]> {
    await this.delay(); // Simulation de latence API
    const sensorDtos: ISensorDto[] = getSensorsFixture;
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

  async getMeasurement(type: SENSOR_TYPE): Promise<MeasurementVO> {
    await this.delay(); // Simulation de latence API
    let fixture;
    switch (type) {
      case SENSOR_TYPE.TEMPERATURE:
        fixture = getMeasurementTemperatureFixture;
        break;
      case SENSOR_TYPE.HUMIDITY:
        fixture = getMeasurementHumidityFixture;
        break;
      case SENSOR_TYPE.CO2:
        fixture = getMeasurementCO2Fixture;
        break;
      default:
        console.error(`Type de capteur non pris en charge: ${type}, utilisation de TEMPERATURE par défaut`);
        fixture = getMeasurementTemperatureFixture;
    }

    return MeasurementMapper.toDomain(fixture);
  }

  async getPriceComfort(): Promise<PriceComfortVO[]> {
    await this.delay(); // Simulation de latence API
    const priceComforts: PriceComfortVO[] = await Promise.all(
      getPriceComfortFixture.map(async (priceComfortDto: IPriceComfortDto) => {
        return await PriceComfortMapper.toDomain(priceComfortDto);
      }),
    );
    return priceComforts;
  }

  async getRewards(): Promise<number> {
    await this.delay(); // Simulation de latence API
    // On simule le fait d'avoir déjà des récompenses
    return Promise.resolve(getRewardsFixture.rewardTotal);
  }

  async getQuiz(): Promise<Quiz | null> {
    await this.delay(); // Simulation de latence API
    // Si un quiz a déjà été répondu aujourd'hui, on renvoie null
    if (this.isQuizAlreadyAnsweredToday()) {
      throw new Error('Quiz already answered today');
    }

    return QuizMapper.toDomain(getQuizFixture[0], 'es');
  }

  async checkAnswer(command: ICheckAnswerCommand): Promise<boolean> {
    await this.delay(); // Simulation de latence API
    this.lastAnsweredQuizDate = new Date();
    const isCorrect = command.answerIdx === 2;
    if (isCorrect) {
      this.rewards += 10;
    }
    return isCorrect;
  }
  // Vérifier si un quiz a déjà été répondu aujourd'hui
  private isQuizAlreadyAnsweredToday(): boolean {
    if (!this.lastAnsweredQuizDate) return false;

    const today = new Date();
    const lastAnswered = this.lastAnsweredQuizDate;

    return (
      today.getFullYear() === lastAnswered.getFullYear() &&
      today.getMonth() === lastAnswered.getMonth() &&
      today.getDate() === lastAnswered.getDate()
    );
  }
  // Méthode pour ajouter des récompenses manuellement (utile pour les tests)
  addRewards(amount: number): void {
    this.rewards += amount;
  }

  async getConsumptions(): Promise<IEnergyConsumption[]> {
    await this.delay(); // Simulation de latence API
    const consos = ConsumptionMapper.toDomain(getConsumptions);
    return Promise.resolve(consos);
  }

  async getPriceComfortMonthly(): Promise<PriceComfortVO[]> {
    await this.delay();

    const months = generateMonthsArray();
    const priceComfortData: Promise<PriceComfortVO>[] = [];

    months.forEach(async (month) => {
      try {
        const pcData = PriceComfortMapper.toDomain(getpc202301[0]);
        priceComfortData.push(pcData);
      } catch (error) {
        console.log(`Données non disponibles pour le mois ${month}`);
      }
    });

    return Promise.all(priceComfortData);
  }
}
