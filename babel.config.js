module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: true,
          allowUndefined: false,
          verbose: false,
        },
      ],
      "expo-router/babel",
      "react-native-reanimated/plugin",
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            context: './src/context',
            types: './src/types',
            hooks: './src/hooks',
            utils: './src/utils',
            validators: './src/validators',
            client: './src/client',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
