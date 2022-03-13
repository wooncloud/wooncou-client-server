module.exports = {
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
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  transpileDependencies: true
}
