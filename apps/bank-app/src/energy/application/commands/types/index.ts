import { Energy } from '@clean-rn/energy/domain';

export enum IEnergyTypes {
  INITIALIZE_ENERGY = 'INITIALIZE_ENERGY',
  GET_ENERGY = 'GET_ENERGY',
  GET_QUIZ = 'GET_QUIZ',
  CHECK_ANSWER = 'CHECK_ANSWER',
  COMPUTE_REWARDS = 'COMPUTE_REWARDS',
  ENERGY_DOMAIN_EVENT = 'ENERGY_DOMAIN_EVENT',
}

export type IInitializeEnergy = {
  type: typeof IEnergyTypes.INITIALIZE_ENERGY;
};

export type IGetEnergy = {
  type: typeof IEnergyTypes.GET_ENERGY;
};

export type IGetQuiz = {
  type: typeof IEnergyTypes.GET_QUIZ;
};

export type ICheckAnswer = {
  type: typeof IEnergyTypes.CHECK_ANSWER;
  payload: {
    answerIdx: number;
    quizId: string;
  };
};

export type IComputeRewards = {
  type: typeof IEnergyTypes.COMPUTE_REWARDS;
};

export type IEnergyDomainEvent = {
  type: typeof IEnergyTypes.ENERGY_DOMAIN_EVENT;
  payload: {
    energy: Energy;
  };
};

export type IEnergyActions =
  | IInitializeEnergy
  | IGetEnergy
  | IGetQuiz
  | ICheckAnswer
  | IComputeRewards
  | IEnergyDomainEvent;
