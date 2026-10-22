module.exports = {
  displayName: 'bank-app',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/react-native|@bank/carbon-weight/dist|@rneui)',
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
    './apps/bank-app/src/shared/application/state-management/reducers/root-reducer.ts',
    './apps/bank-app/src/shared/application/state-management/state/store.ts',
    './apps/bank-app/src/shared/application/usecases/root-saga.ts',
    './apps/bank-app/src/auth/application/state-management/selectors/index.ts',
    './apps/bank-app/src/user/application/state-management/selectors/index.ts',
    './apps/bank-app/src/account/application/state-management/selectors/index.ts',
    './apps/bank-app/src/beneficiary/application/state-management/selectors/index.ts',
    './apps/bank-app/src/kyc/application/state-management/selectors/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      lines: 100,
      functions: 100,
    },
  },
};
