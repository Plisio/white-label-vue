const path = require('path')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: isDev
    ? '/'
    : '',
  outputDir: path.join(__dirname, '../pages/'),
  indexPath: './invoice.php',
  assetsDir: isDev ? 'assets' : '../assets',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    }
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
