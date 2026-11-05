import { Email } from '@clean-rn/auth/domain';
import {
  MEASUREMENT_UNIT,
  PRICE_COMFORT_DATA_GRANULARITY,
  PRICE_COMFORT_TYPE,
  SENSOR_TYPE,
  QUIZ_DIFFICULTY,
  QUIZ_THEME,
} from '@clean-rn/energy/domain';
import { User } from '@clean-rn/user/domain';

export const mockUser = User.CreateFromEmail(new Email('fake@email.com'));
export const mockSensorsCO2 = [
  {
    type: SENSOR_TYPE.CO2,
    startDate: new Date(),
    roomId: 1,
  },
];
export const mockSensorsCO2AndHumidity = [
  {
    type: SENSOR_TYPE.CO2,
    startDate: new Date(),
    roomId: 1,
  },
  {
    type: SENSOR_TYPE.HUMIDITY,
    startDate: new Date(),
    roomId: 1,
  },
];

export const mockMeasurementCO2 = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.PPM,
  average: 100,
  data: [],
};

export const mockMeasurementHumidity = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.PERCENTAGE,
  average: 50,
  data: [],
};

export const mockMeasurementTemperature = {
  observedAt: new Date(),
  unit: MEASUREMENT_UNIT.CELCIUS,
  average: 20,
  data: [],
};

export const mockPricesComfort = [
  {
    type: PRICE_COMFORT_TYPE.ALL,
    granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
    endDate: '2025-03-07T00:00:00.000Z',
    value: {
      incremental: 1480.2069375871483,
      average: 17006.343627221664,
    },
    startDate: '2025-03-01T00:00:00.000Z',
    temperature: 18,
  },
  {
    type: PRICE_COMFORT_TYPE.HEATING,
    granularity: PRICE_COMFORT_DATA_GRANULARITY.DAILY,
    endDate: '2025-03-07T00:00:00.000Z',
    value: {
      incremental: 1480.2069375871483,
      average: 17006.343627221664,
    },
    startDate: '2025-03-01T00:00:00.000Z',
    temperature: 18,
  },
];

export const mockQuizData = {
  choices: [
    "Diminuer la consommation d'énergie",
    'La réduction de la pollution sonore',
    "Augmenter l'efficacité de la ventilation",
  ],
  difficulty: QUIZ_DIFFICULTY.NORMAL,
  intros: [
    "Le saviez-vous ? Le contrôle de la qualité de l'air dans les bâtiments résidentiels ne se limite pas à maintenir l'air frais. Il s'agit d'améliorer la façon dont les bâtiments réagissent aux changements environnementaux.",
    "Maison intelligente, air plus intelligent ! Les capteurs intelligents fournissent des données permettant d'optimiser les systèmes de construction, comme la ventilation. Ils peuvent aider à identifier les zones où la ventilation pourrait avoir besoin d'un coup de pouce, garantissant ainsi un environnement de vie plus sain, plus confortable et plus efficace.",
    "L'installation de capteurs de qualité de l'air n'est pas seulement une tendance technologique - il s'agit de mieux gérer les espaces intérieurs. De la détection des polluants à l'amélioration des performances des systèmes, ces capteurs modifient la façon dont nous contrôlons nos conditions de vie.",
  ],
  question:
    "Quel est l'un des principaux avantages de l'installation de capteurs de qualité de l'air dans les bâtiments résidentiels ?",
  quizId: 92885687,
  reward: 0.5,
  theme: 'AIR_QUALITY',
};
