import { Quiz } from '@clean-rn/energy/domain';
import { IQuizDto, ILocalizedString } from '../dto';
import { getLocales } from 'expo-localization';

const locale = getLocales()[0]?.languageCode || 'fr';

export class QuizMapper {
  static async toDomain(dto: IQuizDto): Promise<Quiz> {
    const choices = dto.choices.map((choice: ILocalizedString) => {
      return choice[locale as keyof ILocalizedString] as string;
    });
    const question = dto.question[locale as keyof ILocalizedString] as string;

    const intros = dto.intros.map((intro: ILocalizedString) => {
      return intro[locale as keyof ILocalizedString] as string;
    });

    return Quiz.Create({ ...dto, quizId: dto.quizId.toString(), question, choices, intros });
  }
}
