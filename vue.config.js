module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tp3_appweb/' : '/',

  configureWebpack: {
    devtool: 'source-map'
  }
}
