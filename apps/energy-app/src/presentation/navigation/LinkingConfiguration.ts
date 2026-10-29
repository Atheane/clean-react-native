/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { IRootStackParamList, IAuthStackParamList } from '../types';

const prefix = Linking.createURL('');

export const LinkingConfiguration: LinkingOptions<IRootStackParamList | IAuthStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Login: 'login',
      ModalError: 'modal-error',
      ModalWebView: 'modal-webview',
      // Home: {
      //   screens: {
      //     MenuDashboard: {
      //       screens: {
      //         Dashbaord: 'dashbaord',
      //       },
      //     },
      //     MenuEpc: {
      //       screens: {
      //         Epc: 'epc',
      //       },
      //     },
      //     MenuSettings: {
      //       screens: {
      //         Transfer: 'settings',
      //       },
      //     },
      //   },
      // },
    },
  },
};
