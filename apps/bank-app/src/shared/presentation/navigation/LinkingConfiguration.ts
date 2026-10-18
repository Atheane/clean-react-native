/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList, AuthStackParamList } from '../types';

export const LinkingConfiguration: LinkingOptions<
  RootStackParamList | AuthStackParamList
  // | HomeStackParamList
  // | CarbonStackParamList
  // | TransferStackParamList
  // | ProfileStackParamList
> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Login: 'Login',
      ResetPassword: 'ResetPassword',
      SignupEmail: 'SignupEmail',
      SignupIdentityPasswordPhone: 'SignupIdentityPasswordPhone',
      SignupValidatePhone: 'SignupValidatePhone',
      SignupBirth: 'SignupBirth',
      SignupAddress: 'SignupAddress',
      Legal: 'Legal',
      Cgu: 'Cgu',
      // Home: {
      //   screens: {
      //     Menu: {
      //       screens: {
      //         Home: 'Home',
      //         Account: 'Account',
      //         RestoFlash: 'RestoFlash',
      //         WeFlo: 'WeFlo',
      //         AccountStatements: 'AccountStatements',
      //         AccountStatementsCurrentMonth: 'AccountStatementsCurrentMonth',
      //         AccountStatementsLastThreeMonths: 'AccountStatementsLastThreeMonths',
      //         AccountStatementsAll: 'AccountStatementsAll',
      //         ExportPdfIban: 'ExportPdfIban',
      //       },
      //     },
      //     Transfer: {
      //       screens: {
      //         Transfer: 'Transfer',
      //       },
      //     },
      //     Carbon: {
      //       screens: {
      //         Carbon: 'Carbon',
      //         House: 'House',
      //         Transport: 'Transport',
      //         Food: 'Food',
      //         Fly: 'Fly',
      //         WarningFood: 'WarningFood',
      //       },
      //     },
      //     Profile: {
      //       screens: {
      //         Profile: 'Profile',
      //       },
      //     },
      //   },
      // },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};
