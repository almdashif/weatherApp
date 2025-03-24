module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'], // Keep this if using dotenv
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@store': './src/store',
        },
      },
    ],
  ],
};
