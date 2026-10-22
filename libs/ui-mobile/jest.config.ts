module.exports = {
  displayName: 'ui-mobile',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/react-native|@bank/carbon-weight/dist|@rneui|react-native-vector-icons|@sentry|expo-contants)',
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/components/**/*.tsx'],
  coveragePathIgnorePatterns: [
    './libs/ui-mobile/src/lib/components/dropdown/',
    './libs/ui-mobile/src/lib/components/search-modal/',
    './libs/ui-mobile/src/lib/components/switch-button/',
  ],
  // coverageThreshold: {
  //   global: {
  //     statements: 100,
  //     branches: 100,
  //     lines: 100,
  //     functions: 100,
  //   },
  // },
};
