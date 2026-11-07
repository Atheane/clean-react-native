import dayjs from 'dayjs';

import {
  User,
  IGender,
  KYC_REVIEW,
  BirthDay,
  Country,
  IUserType,
  APP_USER_MONTHLY_INCOME_RANGE,
  APP_USER_PERSONAL_ASSETS_RANGE,
  APP_USER_OCCUPATION,
} from '@clean-rn/user/domain';
import { Phone } from '@clean-rn/contact/domain';
import { Bic, Iban, IAccountType } from '@clean-rn/account/domain';
import { ITransactionType, ITransaction, Amount } from '@clean-rn/transaction/domain';
import {
  Customer,
  DocumentVO,
  IDocumentStatusCode,
  IDocumentType,
  IStepStatus,
  IStepTypes,
} from '@clean-rn/kyc/domain';

const userProperties = {
  phone: new Phone('+330607080910', 'FR'),
  identity: {
    gender: IGender.WOMAN,
    firstName: 'Jane',
    lastName: 'Doe',
  },
  birth: {
    birthday: new BirthDay(dayjs('1990-01-01')),
    birthCountry: new Country('FR'),
    nationality: new Country('FR'),
  },
  address: {
    str: '5 rue de la paix',
    city: 'Gujan-Mestras',
    zip: '33470',
    country: new Country('FR'),
  },
  kycReview: KYC_REVIEW.NONE,
  USPerson: false,
  userType: IUserType.BANK_USER,
  kycReviewComment: '',
};

export const mockUserKYCNone = User.Create({
  id: 1,
  properties: { ...userProperties, kycReview: KYC_REVIEW.NONE },
});
export const mockUserKYCNoneRevenues = User.Create({
  id: 1,
  properties: {
    ...userProperties,
    kycReview: KYC_REVIEW.NONE,
    revenues: {
      income: APP_USER_MONTHLY_INCOME_RANGE.K2,
      assets: APP_USER_PERSONAL_ASSETS_RANGE.A0,
      occupation: APP_USER_OCCUPATION.EMPLOYEE,
    },
  },
});
export const mockUserKYCW9None = User.Create({
  id: 1,
  properties: { ...userProperties, kycReview: KYC_REVIEW.NONE, USPerson: true },
});

export const mockAccount = {
  accountId: 1,
  accountType: IAccountType.MAIN,
  authorizedBalance: 1000,
  iban: new Iban('FR7630002032531234567890168'),
  bic: new Bic('CRLYFRPPXXX'),
};

export const mockTransaction: ITransaction = {
  id: 1,
  amount: new Amount('10'),
  label: 'Test',
  date: new Date(),
  type: ITransactionType.PAYIN,
};

export const mockCustomerKYCNone = Customer.Create({
  id: 1,
  properties: {
    USPerson: false,
    reviewComment: '',
    status: KYC_REVIEW.NONE,
    steps: {
      [IStepTypes.W9]: undefined,
      [IStepTypes.ID]: IStepStatus.INIT,
      [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
      [IStepTypes.SCT]: IStepStatus.INIT,
    },
  },
});

export const shortBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
export const mockIDDocument = new DocumentVO({
  typeId: IDocumentType.ID,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.ID,
  name: 'first-id.id.recto',
});
mockIDDocument.addPage(shortBase64);

const mockIDDocumentRecto = new DocumentVO({
  typeId: IDocumentType.ID,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.ID,
  name: 'first-id.id.recto',
});

export const mockCustomerKYCNoneEmptyDocumentCreated = Customer.Create({
  id: 1,
  properties: {
    USPerson: false,
    reviewComment: '',
    steps: {
      [IStepTypes.W9]: undefined,
      [IStepTypes.ID]: IStepStatus.INIT,
      [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
      [IStepTypes.SCT]: IStepStatus.INIT,
    },
    currentDocument: mockIDDocumentRecto,
  },
});

const mockIDDocumentRectoWithPage = new DocumentVO({
  typeId: IDocumentType.ID,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.ID,
  name: 'first-id.id.recto',
});
mockIDDocumentRectoWithPage.addPage(shortBase64);

export const mockCustomerKYCNoneDocumentWithRectoPageCreated = Customer.Create({
  id: 1,
  properties: {
    USPerson: false,
    reviewComment: '',
    steps: {
      [IStepTypes.W9]: undefined,
      [IStepTypes.ID]: IStepStatus.INIT,
      [IStepTypes.INFORMATIONS]: IStepStatus.INIT,
      [IStepTypes.SCT]: IStepStatus.INIT,
    },
    currentDocument: mockIDDocumentRectoWithPage,
  },
});

export const mockW9Document = new DocumentVO({
  typeId: IDocumentType.TAX_CERTIFICATE,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.W9,
  name: 'w9.w9.recto',
});

export const mockIPassportDocument = new DocumentVO({
  typeId: IDocumentType.PASSPORT,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.ID,
  name: 'first-id.passport.recto',
});

export const mockIResidencePermitDocument = new DocumentVO({
  typeId: IDocumentType.RESIDENT_PERMIT,
  status: IStepStatus.PENDING,
  statusCode: IDocumentStatusCode.INITIAL,
  createdAt: new Date(),
  context: IStepTypes.ID,
  name: 'first-id.residence-permit.recto',
});
