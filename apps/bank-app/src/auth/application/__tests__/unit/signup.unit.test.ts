import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import {
  Email,
  Phone,
  IGender,
  IRegisterIdentityCommand,
  Prospect,
  ISuccess,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
  AuthError,
  PhoneOtp,
  User,
} from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailExistsGenerator,
  checkEmailExistsSaga,
  registerIdentityGenerator,
  registerIdentitySaga,
  checkPhoneGenerator,
  checkPhoneSaga,
  registerPasswordGenerator,
  registerPasswordSaga,
  registerBirthGenerator,
  registerBirthSaga,
  registerAddressSaga,
  registerAddressGenerator,
  validatePhoneGenerator,
  validatePhoneSaga,
  signupUserSaga,
  signupUserGenerator,
} from '../../usecases/signup';
import {
  ISignupTypes,
  addressRegistered,
  birthRegistered,
  emailChecked,
  identityRegistered,
  passwordRegistered,
  phoneChecked,
  phoneValidated,
  signupFailed,
  userSignedUp,
} from '../../commands/signup';
import { selectEmail, selectProspect } from '../../../application/state-management';

describe('Signup - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  const mockIdentity: IRegisterIdentityCommand = {
    gender: IGender.MAN,
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'FR',
  };

  const mockPassword: IRegisterPasswordCommand = {
    password: 'azekpoakz',
  };

  const mockBirth: IRegisterBirthCommand = {
    birthday: dayjs('1980-01-01'),
    birthCountry: 'FR',
  };

  const mockAddress: IRegisterAddressCommand = {
    str: 'fake address',
    city: 'string',
    zip: 'string',
    country: 'GR',
    USPerson: false,
  };

  const mockQueryEmail = {
    email: new Email('test@example.com'),
  };

  const mockQueryPhone = {
    phone: new Phone('0616804613', 'FR'),
  };

  const mockQueryPhoneOtp = {
    phoneOtp: new PhoneOtp('123456'),
    phone: new Phone('0616804613', 'FR'),
  };

  const mockSuccessTrue: ISuccess = {
    success: true,
  };

  const mockSuccessFalse: ISuccess = {
    success: false,
  };

  it('should wait for FETCH_CHECK_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    const genObject = checkEmailExistsSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_EMAIL_EXISTS, checkEmailExistsGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call checkEmailSuccess actions if email does not exists', () => {
    const mockQueryEmail = {
      email: new Email('test@example.com'),
    };
    const mockSuccessFalse: ISuccess = {
      success: false,
    };

    testSaga(checkEmailExistsGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(mockSuccessFalse)
      .put(emailChecked())
      .next();
  });

  it('should throw SignupFailureEmailExists if email exists', () => {
    testSaga(checkEmailExistsGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL_EXISTS,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(mockSuccessTrue)
      .put(signupFailed(new AuthError.SignupFailureEmailExists()))
      .next()
      .cancel();
  });

  it('should wait for REGISTER_IDENTITY action and call registerIdentityGenerator, should be done on next iteration', () => {
    const genObject = registerIdentitySaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerIdentity actions if prospect exists', () => {
    const prospectPrev = Prospect.Create(new Email('test@example.com'));
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockIdentity,
    })
      .next()
      .select(selectProspect)
      .next(prospectPrev)
      .put(identityRegistered(prospect))
      .next();
  });

  it('should call registerIdentity actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockIdentity,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(identityRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_PASSWORD action and call registerPasswordGenerator, should be done on next iteration', () => {
    const genObject = registerPasswordSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerPassword actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerPassword(mockPassword.password);

    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(passwordRegistered(prospect))
      .next();
  });

  it('should call registerPassword actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerPassword(mockPassword.password);

    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(passwordRegistered(prospect))
      .next();
  });

  it('should wait for FETCH_CHECK_PHONE_EXISTS action and call registerPhoneGenerator, should be done on next iteration', () => {
    const genObject = checkPhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_PHONE, checkPhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call phoneChecked', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(mockSuccessFalse)
      .call([api, api.sendPhoneValidation], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(phoneChecked())
      .next();
  });

  it('should call signupFailed action if phone exists', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(mockSuccessTrue)
      .put(signupFailed(new AuthError.SignupFailurePhoneExists()))
      .next()
      .cancel();
  });

  it('should call signupFailed action if send phone validation code fails', () => {
    testSaga(checkPhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_PHONE,
      payload: mockQueryPhone,
    })
      .next()
      .call([api, api.searchPhone], mockQueryPhone)
      .next(mockSuccessFalse)
      .call([api, api.sendPhoneValidation], mockQueryPhone)
      .next(mockSuccessFalse)
      .put(signupFailed(new AuthError.SignupFailureSendPhoneValidation()))
      .next()
      .cancel();
  });

  it('should wait for FETCH_VALIDATE_PHONE action and call validatePhoneGenerator, should be done on next iteration', () => {
    const genObject = validatePhoneSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_VALIDATE_PHONE, validatePhoneGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call phoneValidated if propect exists', () => {
    const prospectPrev = Prospect.Create(new Email('test@example.com'));
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .select(selectProspect)
      .next(prospectPrev)
      .put(phoneValidated(prospect))
      .next();
  });

  it('should call phoneValidated if prospect does not exist', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.validatePhone(mockQueryPhoneOtp);

    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.FETCH_VALIDATE_PHONE,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessTrue)
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(phoneValidated(prospect))
      .next();
  });

  it('should call signupFailed action if otp incorrect', () => {
    testSaga(validatePhoneGenerator, httpConnection, {
      type: ISignupTypes.SIGNUP_FAILED,
      payload: mockQueryPhoneOtp,
    })
      .next()
      .call([api, api.checkPhoneValidation], mockQueryPhoneOtp)
      .next(mockSuccessFalse)
      .put(signupFailed(new AuthError.SignupFailureInvalidPhoneCode()))
      .next()
      .cancel();
  });

  it('should wait for REGISTER_BIRTH action and call registerBirthGenerator, should be done on next iteration', () => {
    const genObject = registerBirthSaga();

    expect(genObject.next().value).toEqual(takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerBirth actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(birthRegistered(prospect))
      .next();
  });

  it('should call registerBirth actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(birthRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_ADDRESS action and call registerAddressGenerator, should be done on next iteration', () => {
    const genObject = registerAddressSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerAddress actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(addressRegistered(prospect))
      .next();
  });

  it('should call registerAddress actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(addressRegistered(prospect))
      .next();
  });

  it('should wait for FETCH_SIGNUP_USER action and call signupUserGenerator, should be done on next iteration', () => {
    const genObject = signupUserSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_SIGNUP_USER, signupUserGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call userSignedUp actions if prospect exists', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);
    prospect.registerPassword(mockPassword.password);
    prospect.validatePhone(mockQueryPhoneOtp);
    prospect.registerBirth(mockBirth);
    prospect.registerAddress(mockAddress);

    const uid = '123';
    const user = User.Signup({ id: uid, ...prospect.properties });

    testSaga(signupUserGenerator, httpConnection)
      .next()
      .select(selectProspect)
      .next(prospect)
      .call([api, api.createUser], { ...prospect.properties })
      .next({ uid })
      .put(userSignedUp(user))
      .next();
  });
});
