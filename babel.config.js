module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          AppComponents: './src/components',
          AppRoutes: './src/routes',
          AppUtils: './src/utils',
          AppAssets: './src/assets',
          AppTheme: './src/theme',
          AppModules: './src/modules',
          AppTypes: './src/types/types.d.ts',
          AppStores:'./src/stores',
          AppApi:'./src/api',
          AppContex:'./src/context',
          AppHook:'./src/hook'
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-worklets/plugin',
  ],
};

