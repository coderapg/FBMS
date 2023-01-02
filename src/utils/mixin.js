/**
 * 混入操作
 */

// 跳转
export const pathMixins = {
  methods: {
    pathTo (path) {
      this.$router.push(path)
    }
  }
}
