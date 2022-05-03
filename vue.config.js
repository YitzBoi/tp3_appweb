module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tp3/' : '/',

  configureWebpack: {
    devtool: 'source-map'
  }
}
