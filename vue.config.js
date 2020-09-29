/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = {
  parallel: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '光鹰短视频'
        return args;
      })
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      });
  }
}
