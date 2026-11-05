import { Entity } from '@clean-rn/ddd';
import { QUIZ_DIFFICULTY } from '../types';
import { ENERGY_EVENTS } from '../events';

export interface IQuizProperties {
  quizId: string;
  choices: string[];
  difficulty: QUIZ_DIFFICULTY;
  intros: string[];
  question: string;
  reward: number;
  theme: string;
  answerIsCorrect?: boolean;
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

  checkAnswer(answer: string, correctAnswer: string) {
    this.properties.answerIsCorrect = answer === correctAnswer;
    Quiz.emitStaticDomainEvent(ENERGY_EVENTS.QUIZ_ANSWER_CHECKED, this);
  }

  computeReward(): number {
    if (this.properties.answerIsCorrect) {
      return this.properties?.reward ?? 0;
    }
    return 0;
  }
}
