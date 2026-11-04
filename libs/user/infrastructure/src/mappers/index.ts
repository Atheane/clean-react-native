import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import {
  User,
  IGender,
  BirthDay,
  Country,
  ISignupUserCommand,
  IIncome,
  IAssets,
  IOccupation,
} from '@clean-rn/user/domain';
import dayjs from 'dayjs';
import {
  ICreateUserDto,
  IUserDto,
  APP_USER_MONTHLY_INCOME_RANGE,
  APP_USER_PERSONAL_ASSETS_RANGE,
  APP_USER_OCCUPATION,
} from '../types';

export class UserMapper {
  static async toDomain(dto: IUserDto): Promise<User> {
    let gender = IGender.NEUTRAL;
    if (dto.title === 'M') {
      gender = IGender.MAN;
    } else if (dto.title === 'MME') {
      gender = IGender.WOMAN;
    }
    const userProperties = {
      email: new Email(dto.email),
      phone: new Phone(dto.phone),
      identity: {
        gender,
        firstName: dto.firstname,
        lastName: dto.lastname,
      },
      birth: {
        birthday: new BirthDay(dayjs(dto.birthday)),
        nationality: new Country(dto.nationality),
        birthCountry: new Country(dto.birthCountry),
      },
      address: {
        city: dto.address.city,
        country: new Country(dto.address.country),
        str: dto.address.str,
        zip: dto.address.zip,
      },
      kycReview: dto.kycReview,
      kycReviewComment: dto.kycReviewComment,
      USPerson: dto.specifiedUSPerson === 1,
    };
    const user = User.Create({ id: dto.userId, properties: userProperties });
    if (dto.config) {
      user.setConfig(dto.config);
    }
    if (dto.monthlyIncomeRange && dto.personalAssetsRange && dto.occupationCategory) {
      const income =
        dto.monthlyIncomeRange === APP_USER_MONTHLY_INCOME_RANGE.K2
          ? IIncome.LESS_THAN_1800
          : dto.monthlyIncomeRange === APP_USER_MONTHLY_INCOME_RANGE.K4
            ? IIncome.BETWEEN_1800_AND_3500
            : dto.monthlyIncomeRange === APP_USER_MONTHLY_INCOME_RANGE.K5
              ? IIncome.BETWEEN_3500_AND_10000
              : IIncome.MORE_THAN_10000;
      const assets =
        dto.personalAssetsRange === APP_USER_PERSONAL_ASSETS_RANGE.A0
          ? IAssets.LESS_THAN_150K
          : dto.personalAssetsRange === APP_USER_PERSONAL_ASSETS_RANGE.A4
            ? IAssets.BETWEEN_150K_AND_350K
            : dto.personalAssetsRange === APP_USER_PERSONAL_ASSETS_RANGE.A5
              ? IAssets.BETWEEN_350K_AND_750K
              : IAssets.MORE_THAN_750K;
      const occupation =
        dto.occupationCategory === APP_USER_OCCUPATION.UNEMPLOYED
          ? IOccupation.UNEMPLOYED
          : dto.occupationCategory === APP_USER_OCCUPATION.EMPLOYEE
            ? IOccupation.PRIVATE_EMPLOYEE
            : IOccupation.PUBLIC_EMPLOYEE;
      user.registerRevenues({
        income,
        assets,
        occupation,
      });
    }
    return user;
  }

  static toCreateUserDto({ user, phoneOtp }: ISignupUserCommand): ICreateUserDto {
    let title: string;
    if (user.properties.identity?.gender === IGender.MAN) {
      title = 'M';
    } else if (user.properties.identity?.gender === IGender.WOMAN) {
      title = 'MME';
    } else {
      title = 'MLLE'; // KycProvider do not have title for neutral gender. As a reminder, we use Mlle as incorrectly encoded value for neutral gender
    }

    const createUserDto = {
      email: user.properties.email?.value,
      title,
      firstname: user.properties.identity?.firstName,
      lastname: user.properties.identity?.lastName,
      ...(user.properties.phone && { phone: user.properties.phone.valueInternational }),
      password: user.properties.password?.value,
      birthday: user.properties.birth?.birthday?.value,
      birthCountry: user.properties.birth?.birthCountry?.value,
      nationality: user.properties.birth?.nationality?.value,
      address: {
        ...user.properties.address,
        ...(user.properties.address?.country && { country: user.properties.address.country.value }),
      },
      phoneValidationCode: phoneOtp.value,
      specifiedUSPerson: user.properties.USPerson ? 1 : 0,
    };
    if (!user.properties.revenues) return createUserDto as unknown as ICreateUserDto;

    let monthlyIncomeRange;
    let personalAssetsRange;
    let occupationCategory;
    switch (user.properties.revenues.income) {
      case IIncome.LESS_THAN_1800:
        monthlyIncomeRange = APP_USER_MONTHLY_INCOME_RANGE.K2;
        break;
      case IIncome.BETWEEN_1800_AND_3500:
        monthlyIncomeRange = APP_USER_MONTHLY_INCOME_RANGE.K4;
        break;
      case IIncome.BETWEEN_3500_AND_10000:
        monthlyIncomeRange = APP_USER_MONTHLY_INCOME_RANGE.K5;
        break;
      case IIncome.MORE_THAN_10000:
        monthlyIncomeRange = APP_USER_MONTHLY_INCOME_RANGE.KN;
        break;
      default:
        monthlyIncomeRange = undefined;
    }
    switch (user.properties.revenues.assets) {
      case IAssets.LESS_THAN_150K:
        personalAssetsRange = APP_USER_PERSONAL_ASSETS_RANGE.A0;
        break;
      case IAssets.BETWEEN_150K_AND_350K:
        personalAssetsRange = APP_USER_PERSONAL_ASSETS_RANGE.A4;
        break;
      case IAssets.BETWEEN_350K_AND_750K:
        personalAssetsRange = APP_USER_PERSONAL_ASSETS_RANGE.A5;
        break;
      case IAssets.MORE_THAN_750K:
        personalAssetsRange = APP_USER_PERSONAL_ASSETS_RANGE.A6;
        break;
      default:
        personalAssetsRange = undefined;
    }
    switch (user.properties.revenues.occupation) {
      case IOccupation.UNEMPLOYED:
        occupationCategory = APP_USER_OCCUPATION.UNEMPLOYED;
        break;
      case IOccupation.PRIVATE_EMPLOYEE:
        occupationCategory = APP_USER_OCCUPATION.EMPLOYEE;
        break;
      case IOccupation.PUBLIC_EMPLOYEE:
        occupationCategory = APP_USER_OCCUPATION.PUBLIC_EMPLOYEE;
        break;
      default:
        occupationCategory = undefined;
    }
    return {
      ...createUserDto,
      ...(monthlyIncomeRange && { monthlyIncomeRange }),
      ...(personalAssetsRange && { personalAssetsRange }),
      ...(occupationCategory && { occupationCategory }),
    } as unknown as ICreateUserDto;
  }
}
