// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/** @type {import("expo/metro-config").MetroConfig} */
const config = {
  ...defaultConfig,
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    assetPlugins: ["expo-asset/tools/hashAssetFiles"]
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  }
};

module.exports = config;
