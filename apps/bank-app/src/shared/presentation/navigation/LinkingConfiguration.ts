/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import {
  IRootStackParamList,
  IAuthStackParamList,
  ISharedStackParamList,
  IAccountStackParamList,
  ICarbonStackParamList,
  IKycStackParamList,
  ITransactionStackParamList,
  IBeneficiaryStackParamList,
  IProfileStackParamList,
  IUserStackParamList,
  ITransferStackParamList,
} from '../types';

export const LinkingConfiguration: LinkingOptions<
  | IRootStackParamList
  | IAuthStackParamList
  | ISharedStackParamList
  | IAccountStackParamList
  | ICarbonStackParamList
  | IKycStackParamList
  | ITransactionStackParamList
  | IBeneficiaryStackParamList
  | IProfileStackParamList
  | ITransferStackParamList
  | IUserStackParamList
> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      // auth
      Login: 'Login',
      ResetPassword: 'ResetPassword',
      // shared
      Legal: 'Legal',
      Cgu: 'Cgu',
      CguKycProvider: 'CguKycProvider',
      ModalError: 'ModalError',
      ModalWebView: 'ModalWebView',
      // userStack
      SignupEmail: 'SignupEmail',
      SignupIdentityPasswordPhone: 'SignupIdentityPasswordPhone',
      SignupValidatePhone: 'SignupValidatePhone',
      SignupBirth: 'SignupBirth',
      SignupAddress: 'SignupAddress',
      SignupCongrats: 'SignupCongrats',
      EmailSent: 'EmailSent',
      SignupPhone: 'SignupPhone',
      Home: {
        screens: {
          MenuAccount: {
            screens: {
              Accounts: 'Accounts',
              RibPdf: 'RibPdf',
            },
          },
          MenuTransaction: {
            screens: {
              Transactions: 'Transactions',
              AccountStatements: 'AccountStatements',
              AccountStatementsPdf: 'AccountStatementsPdf',
            },
          },
          MenuTransfer: {
            screens: {
              Transfer: 'Transfer',
              TransferSuccess: 'TransferSuccess',
            },
          },
          MenuBeneficiary: {
            screens: {
              BeneficiaryList: 'BeneficiaryList',
              BeneficiaryAdd: 'BeneficiaryAdd',
              ContactAdd: 'ContactAdd',
            },
          },
          MenuCarbon: {
            screens: {
              Carbon: 'Carbon',
              House: 'House',
              Transport: 'Transport',
              Food: 'Food',
              Fly: 'Fly',
              WarningFood: 'WarningFood',
            },
          },
          MenuProfile: {
            screens: {
              Profile: 'Profile',
              NotificationSettings: 'NotificationSettings',
            },
          },
          MenuKyc: {
            screens: {
              InitKyc: 'InitKyc',
              Kyc: 'Kyc',
              KycDocumentsValidated: 'KycDocumentsValidated',
              IdList: 'IdList',
              UploadDocument: 'UploadDocument',
              ResidenceProofOptions: 'ResidenceProofOptions',
              ResidenceProofList: 'ResidenceProofList',
              KycHost: 'KycHost',
              HostIdList: 'HostIdList',
              HostResidenceProofList: 'HostResidenceProofList',
              SuccessKyc: 'SuccessKyc',
              CardSent: 'CardSent',
            },
          },
        },
      },
    },
  },
};
