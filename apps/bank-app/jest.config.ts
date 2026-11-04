module.exports = {
  displayName: 'bank-app',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/react-native|@bank/carbon-weight/dist|@rneui|react-native-vector-icons|@sentry|expo-contants|uuidjs|expo-contacts|expo-localization)',
  ],
  testPathIgnorePatterns: ['<rootDir>/src/.*generate-fixtures\\.(ts|js)$'],
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
    '<rootDir>/src/.*generate-fixtures\\.(ts|js)$',
    '<rootDir>/src/shared/application/state-management/reducers/root-reducer.ts',
    '<rootDir>/src/shared/application/state-management/state/store.ts',
    '<rootDir>/src/shared/application/usecases/root-saga.ts',
    '<rootDir>/src/shared/application/usecases/ensureTokenRefreshed.ts',
    '<rootDir>/src/auth/application/usecases/session/index.ts',
    '<rootDir>/src/beneficiary/application/usecases/contact/index.ts',
    '<rootDir>/src/.*selectors.*/',
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
