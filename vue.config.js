module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/service'
    : '/',

  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  lintOnSave: false
}
