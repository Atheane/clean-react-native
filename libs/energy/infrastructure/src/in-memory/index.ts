import {
  IEnergyRepository,
  ISensor,
  MeasurementVO,
  PriceComfortVO,
  Quiz,
  SENSOR_TYPE,
  ICheckAnswerCommand,
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

// Import des mappers pour transformer les fixtures en objets domaine
import { SensorMapper, MeasurementMapper, PriceComfortMapper, QuizMapper } from '../mappers';

export class EnergyRepositoryInMemory implements IEnergyRepository {
  private static instance: EnergyRepositoryInMemory | null = null;
  private lastAnsweredQuizDate: Date | null = null;
  private rewards: number = 0;
  private readonly delayMs: number = 800; // Délai de 800ms pour simuler une API

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

  async getQuiz(): Promise<Quiz> {
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
}
