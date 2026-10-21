import { Email } from '@clean-rn/auth/domain';
import { User, Phone, IGender, BirthDay, Country } from '@clean-rn/user/domain';
import dayjs from 'dayjs';
import { IUserPropertiesServer } from '../types';

export const mapUserServerToUserProperties = (result: IUserPropertiesServer): User => {
  let gender = IGender.NEUTRAL;
  if (result.title === 'M') {
    gender = IGender.MAN;
  } else if (result.title === 'MME') {
    gender = IGender.WOMAN;
  }
  const userProperties = {
    email: new Email(result.email),
    phone: new Phone(result.phone),
    identity: {
      gender,
      firstName: result.firstname,
      lastName: result.lastname,
    },
    birth: {
      birthday: new BirthDay(dayjs(result.birthday)),
      nationality: new Country(result.nationality),
    },
    kycReview: result.kycReview,
    kycReviewComment: result.kycReviewComment,
    USPerson: result.specifiedUSPerson === 1,
  };

  return User.Create({ id: result.userId, properties: userProperties });
};
