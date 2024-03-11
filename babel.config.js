module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.jsx",
            ".android.ts",
            ".android.tsx",
            ".ios.js",
            ".ios.jsx",
            ".ios.ts",
            ".ios.tsx"
          ],
          root: ["./src"],
          alias: {
            assets: "./assets",
            config: "./config",
            containers: "./containers",
            i18n: "./i18n",
            "@styles": "./src/styles",
            interfaces: "./interfaces",
            utils: "./utils"
          }
        }
      ],
      // Required for expo-router
      "expo-router/babel"
    ]
  };
};
