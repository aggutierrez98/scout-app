module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["react-native-reanimated/plugin"],
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
