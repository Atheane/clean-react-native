import { Entity } from '@clean-rn/ddd';
import { QUIZ_DIFFICULTY } from '../types';

export interface IQuizProperties {
  quizId: string;
  choices: string[];
  difficulty: QUIZ_DIFFICULTY;
  intros: string[];
  question: string;
  reward: number;
  theme: string;
}

// if several houses, convert Energy to HouseEnergy
export class Quiz extends Entity<IQuizProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IQuizProperties> }) {
    super({ id, properties });
  }

  static Create({ quizId, choices, difficulty, intros, question, reward, theme }: IQuizProperties): Quiz {
    const quiz = new Quiz({
      properties: {
        quizId,
        choices,
        difficulty,
        intros,
        question,
        reward,
        theme,
      },
    });
    return quiz;
  }
}
