module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.2.43:9100',
        changeOrigin: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    port: 8080
  }
}
