const { withAppBuildGradle } = require('@expo/config-plugins');

const withDisabledAndroidLint = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = config.modResults.contents.replace(
        /android {/,
        `android {
    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }`,
      );
    }
    return config;
  });
};

module.exports = withDisabledAndroidLint;
