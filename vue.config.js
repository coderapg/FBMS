module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        https: '@/https',
        utils: '@/utils',
        views: '@/views'
      }
    }
  }
}
