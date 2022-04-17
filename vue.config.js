const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ["/", "/report", "/posts", "/detail", "/tags", "/goldbox"],
    server: {
      port: 8080
    },
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: '#app',
      "headless": false
    }),
  }),
];

module.exports = {
  outputDir: path.resolve(__dirname, "../WoonCou-API-Server/client/"),
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '운쿠 :: 추천 & 가이드 & 팁 컬렉션',
      description: '운쿠의 추천, 팁, 가이드 컬렉션',
      siteUrl: 'http://wooncou.com'
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
