const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: isDev
    ? '/'
    : '',
  outputDir: '../pages/',
  indexPath: './invoice.php',
  assetsDir: '../assets',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        '@assets': path.join(__dirname, './src/assets')
      }
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  devServer: {
    // contentBase: path.join(__dirname, './dist'),
    proxy: `${process.env.APP_URL}:${process.env.APP_PORT}`,
    openPage: '?page=invoice&invoice_id=' + process.env.DEV_INVOICE_ID,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
