module.exports = {
  displayName: 'energy-app',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/react-native|@bank/carbon-weight/dist|@rneui|react-native-vector-icons|@sentry|expo-contants|uuidjs|expo-contacts|expo-localization)',
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFiles: ['<rootDir>/jest-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  collectCoverage: true,
  coverageCollectedFrom: ['<rootDir>/src/**/*.(t|j)s'],
  collectCoverageFrom: ['**/application/**/*.ts'],
  coveragePathIgnorePatterns: [
    './apps/energy-app/src/application/state-management/reducers/root-reducer.ts',
    './apps/energy-app/src/application/usecases/root-saga.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 60,
      lines: 60,
      functions: 60,
    },
  },
};
