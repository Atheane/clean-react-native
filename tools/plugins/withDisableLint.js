module.exports = function withDisabledLint(config) {
  if (config.android === undefined) {
    config.android = {};
  }
  if (config.android.gradleProperties === undefined) {
    config.android.gradleProperties = {};
  }
  config.android.gradleProperties['android.lint.ignoreTestSources'] = 'true';
  return config;
};
