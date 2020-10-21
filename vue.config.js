/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = {
  parallel: false,
  devServer: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://47.99.44.122:9531',
        // target: 'http://47.99.44.122:9531',
=======
        // target: 'http://172.16.1.66:9531',
        target: 'http://47.99.44.122:9531',
>>>>>>> 946f9ff2e205c63f46e15c9c9c63d5480614f56b
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
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
