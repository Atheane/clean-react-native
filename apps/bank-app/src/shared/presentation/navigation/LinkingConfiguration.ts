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
  IKycStackParamList,
  ITransactionStackParamList,
  IBeneficiaryStackParamList,
  IParametersStackParamList,
  IUserStackParamList,
  ICardStackParamLimit,
  IFootprintStackParamList,
  IEnergyStackParamList,
} from '../types';

export const LinkingConfiguration: LinkingOptions<
  | IRootStackParamList
  | IAuthStackParamList
  | ISharedStackParamList
  | IAccountStackParamList
  | IKycStackParamList
  | ITransactionStackParamList
  | IBeneficiaryStackParamList
  | IParametersStackParamList
  | IUserStackParamList
  | ICardStackParamLimit
  | IFootprintStackParamList
  | IEnergyStackParamList
> = {
  prefixes: ['com.example.bankapp://'],
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
      SignupRevenues: 'signup-revenues',
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
          MenuParameters: {
            screens: {
              Parameters: 'parameters',
              AccountSettings: 'account-settings',
              ApplicationSettings: 'application-settings',
              NotificationSettings: 'notification-settings',
              ManageBeneficiaries: 'manage-beneficiaries',
              BankCoordinates: 'bank-coordinates',
              Languages: 'languages',
              ProfileIdentity: 'profile-identity',
              ProfileAddress: 'profile-address',
              DeleteAccount: 'delete-account',
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
          MenuEnergy: {
            screens: {
              MenuEnergy: 'menu-energy',
              HelpComfortPrice: 'help-comfort-price',
              WinGreenEuros: 'win-green-euros',
              AdaptTemperature: 'adapt-temperature',
              RenovateMyHouse: 'renovate-my-house',
              MyEnergyConsumption: 'my-energy-consumption',
            },
          },
        },
      },
    },
  },
};
