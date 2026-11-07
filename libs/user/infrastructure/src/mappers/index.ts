import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import { User, IGender, BirthDay, Country, ISignupUserCommand } from '@clean-rn/user/domain';
import dayjs from 'dayjs';
import { ICreateUserDto, IUserDto } from '../types';

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
    if (
      dto.monthlyIncomeRange !== undefined &&
      dto.personalAssetsRange !== undefined &&
      dto.occupationCategory !== undefined
    ) {
      user.updateUser({
        revenues: {
          income: dto.monthlyIncomeRange,
          assets: dto.personalAssetsRange,
          occupation: dto.occupationCategory,
        },
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
      monthlyIncomeRange: user.properties.revenues?.income,
      personalAssetsRange: user.properties.revenues?.assets,
      occupationCategory: user.properties.revenues?.occupation,
    };

    return createUserDto as unknown as ICreateUserDto;
  }
}
