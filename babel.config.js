module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置按需引入element-ui
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
