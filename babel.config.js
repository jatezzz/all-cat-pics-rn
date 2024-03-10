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
            assets: "./src/assets",
            components: "./src/components",
            config: "./src/config",
            containers: "./src/containers",
            i18n: "./src/i18n",
            screens: "./src/screens",
            services: "./src/services",
            styles: "./src/styles",
            interfaces: "./src/interfaces",
            utils: "./src/utils"
          }
        }
      ],
      // Required for expo-router
      "expo-router/babel"
    ]
  };
};
