const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, "../WoonCou-API-Server/client/"),
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '운쿠 :: 추천 & 가이드 & 팁 컬렉션',
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URI,
        changeOrigin: true,
        secure:false,
        logLevel: 'debug' 
      }
    }
  },

  transpileDependencies: true
}
