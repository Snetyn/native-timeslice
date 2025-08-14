const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.transformer = {
  ...config.transformer,
  enableBabelRCLookup: true,
  sourceMaps: true,
};

module.exports = config;
