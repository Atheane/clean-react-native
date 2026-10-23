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
  ICardStackParamLimit,
} from '../types';

const prefix = Linking.createURL('');

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
  | IUserStackParamList
  | ICardStackParamLimit
> = {
  prefixes: [prefix],
  config: {
    screens: {
      // auth
      Login: 'login',
      ResetPassword: 'reset-password',
      // shared
      Legal: 'legal',
      Cgu: 'cgu',
      CguKycProvider: 'cgu-kyc-provider',
      ModalError: 'modal-error',
      ModalWebView: 'modal-webview',
      // userStack
      SignupEmail: 'signup-email',
      SignupIdentityPasswordPhone: 'signup-identity-password-phone',
      SignupValidatePhone: 'signup-validate-phone',
      SignupBirth: 'signup-birth',
      SignupAddress: 'signup-address',
      SignupCongrats: 'signup-congrats',
      EmailSent: 'email-sent',
      SignupPhone: 'signup-phone',
      Home: {
        screens: {
          MenuAccount: {
            screens: {
              Accounts: 'accounts',
              RibPdf: 'rib-pdf',
            },
          },
          MenuTransaction: {
            screens: {
              Transactions: 'transactions',
              AccountStatements: 'account-statements',
              AccountStatementsPdf: 'account-statements-pdf',
            },
          },
          MenuTransfer: {
            screens: {
              Transfer: 'transfer',
              TransferSuccess: 'transfer-success',
            },
          },
          MenuBeneficiary: {
            screens: {
              BeneficiaryList: 'beneficiary-list',
              BeneficiaryAdd: 'beneficiary-add',
              ContactAdd: 'contact-add',
            },
          },
          MenuCarbon: {
            screens: {
              Carbon: 'carbon',
              House: 'house',
              Transport: 'transport',
              Food: 'food',
              Fly: 'fly',
              WarningFood: 'warning-food',
            },
          },
          MenuProfile: {
            screens: {
              Profile: 'profile',
              NotificationSettings: 'notification-settings',
            },
          },
          MenuKyc: {
            screens: {
              InitKyc: 'init-kyc',
              Kyc: 'kyc',
              KycDocumentsValidated: 'kyc-documents-validated',
              IdList: 'id-list',
              UploadDocument: 'upload-document',
              ResidenceProofOptions: 'residence-proof-options',
              ResidenceProofList: 'residence-proof-list',
              KycHost: 'kyc-host',
              HostIdList: 'host-id-list',
              HostResidenceProofList: 'host-residence-proof-list',
              SuccessKyc: 'success-kyc',
              CardSent: 'card-sent',
            },
          },
          MenuCard: {
            screens: {
              Card: 'card',
              KycMissing: 'kyc-missing',
              WaitingCard: 'waiting-card',
              CardLimits: 'card-limits',
              ChangePin: 'change-pin',
              ChangePinSuccess: 'change-pin-success',
              ShowPin: 'show-pin',
              LockCard: 'lock-card',
              LockCardSuccess: 'lock-card-success',
            },
          },
        },
      },
    },
  },
};
