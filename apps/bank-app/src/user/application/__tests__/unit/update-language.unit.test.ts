import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import dayjs from 'dayjs';

import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import {
  IGender,
  User,
  KYC_REVIEW,
  BirthDay,
  Country,
  IUpdateUserConfigCommand,
  ILanguage,
} from '@clean-rn/user/domain';
import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { goBack } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { updateLanguageSaga, updateLanguageGenerator } from '../../usecases';
import { IUserTypes, languageUpdated, resetError } from '../../commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

describe('Update Language - usecase', () => {
  const httpConnection = HttpConnection.getInstance(process.env.EXPO_PUBLIC_BASE_URL_API || '');
  const userApi = UserApi.getInstance(httpConnection);

  const user = User.Create({
    id: 123,
    properties: {
      kycReview: KYC_REVIEW.NONE,
      USPerson: false,
      birth: {
        birthday: new BirthDay(dayjs('1980-01-01T00:00:00.000Z')),
        nationality: new Country('SE'),
      },
      email: new Email('user1@example.com'),
      identity: {
        firstName: 'aze',
        gender: IGender.NEUTRAL,
        lastName: 'aze',
      },
      phone: new Phone('+46726413201'),
    },
  });

  const mockUpdateLanguage: IUpdateUserConfigCommand = {
    lang: ILanguage.FR,
  };

  const mockError500 = {
    message: 'Core::AuthService::Auth - Server Error',
    statusCode: 500,
    response: 'Core::AuthService::Auth - Server Error',
    timestamp: '2023-04-07T15:28:04.657Z',
    path: '/auth/login',
  };

  it('should wait for FETCH_UPDATE_LANGUAGE action and call updateLanguageGenerator, should be done on next iteration', () => {
    const genObject = updateLanguageSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(IUserTypes.FETCH_UPDATE_LANGUAGE, updateLanguageGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call cancel if no lang in payload', () => {
    testSaga(updateLanguageGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_LANGUAGE,
      payload: {},
    })
      .next()
      .cancel();
  });

  it('should call languageUpdated', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateLanguage);

    testSaga(updateLanguageGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_LANGUAGE,
      payload: mockUpdateLanguage,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([userApi, userApi.updateConfig], mockUpdateLanguage)
      .next(userWithConfig)
      .put(languageUpdated({ user: userWithConfig }))
      .next()
      .call(goBack)
      .next();
  });

  it('should call languageUpdated if language is EL', () => {
    const userWithConfig = user;
    const mockUpdateLanguage: IUpdateUserConfigCommand = {
      lang: ILanguage.EL,
    };
    userWithConfig.setConfig(mockUpdateLanguage);

    testSaga(updateLanguageGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_LANGUAGE,
      payload: mockUpdateLanguage,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .call([userApi, userApi.updateConfig], mockUpdateLanguage)
      .next(userWithConfig)
      .put(languageUpdated({ user: userWithConfig }))
      .next()
      .call(goBack)
      .next();
  });

  it('should call showUnknownError if 500', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateLanguage);

    testSaga(updateLanguageGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_LANGUAGE,
      payload: mockUpdateLanguage,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new ServerError(mockError500))
      .put(resetError())
      .next()
      .put(showUnknownError(new ServerError(mockError500)))
      .next();
  });

  it('should call showUnknownError if unknown error', () => {
    const userWithConfig = user;
    userWithConfig.setConfig(mockUpdateLanguage);

    testSaga(updateLanguageGenerator, httpConnection, {
      type: IUserTypes.FETCH_UPDATE_LANGUAGE,
      payload: mockUpdateLanguage,
    })
      .next()
      .call(ensureTokenRefreshed, httpConnection)
      .next()
      .throw(new Error('unknown error'))
      .put(resetError())
      .next()
      .put(showUnknownError(new Error('unknown error')))
      .next();
  });
});
