import { Quiz } from '@clean-rn/energy/domain';
import { IQuizDto, ILocalizedString } from '../dto';

export class QuizMapper {
  static async toDomain(dto: IQuizDto, locale: string): Promise<Quiz | null> {
    if (!dto) {
      return null;
    }
    const defaultLocale = 'en';
    const choices = dto.choices.map((choice: ILocalizedString) => {
      return choice[locale as keyof ILocalizedString].length === 0
        ? (choice[defaultLocale] as string)
        : choice[locale as keyof ILocalizedString];
    });
    const question =
      dto.question[locale as keyof ILocalizedString].length === 0
        ? (dto.question[defaultLocale] as string)
        : dto.question[locale as keyof ILocalizedString];

    const intros = dto.intros.map((intro: ILocalizedString) => {
      return intro[locale as keyof ILocalizedString].length === 0
        ? (intro[defaultLocale] as string)
        : intro[locale as keyof ILocalizedString];
    });

    return Quiz.Create({ ...dto, quizId: dto.quizId.toString(), question, choices, intros });
  }
}
