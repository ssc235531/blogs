// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var obj = [
  {
      "id":0,
     "shop":"JUST Q一直都在",
     "options":[
         {
             "num":"0-1",
             "img":"static/a.png",
             "tit":"JUST Q 超有型 店主强烈推荐 时尚气质三色 宽松风衣短风衣外套 女",
             "intro":"卡色;均码",
             "price":"238.00",
             "count":"1",
             "state":false,
             "color":[
                 "卡色;均码",
                 "白色;均码",
                 "绿色;均码"
             ]
         }
     ]
  },
  {
      "id":1,
     "shop":"洛洛拉",
     "options":[
         {
             "num":"1-1",
             "img":"static/b.png",
             "tit":"2017春季新款韩版显气质OL时装金属扣装宽松百搭长袖雪纺衬衫女",
             "intro":"裸色;M",
             "price":"129.00",
             "count":"1",
             "state":false,
              "color":[
                 "裸色;M",
                 "白色;M",
                 "黑色;M"
             ]
         }
         
     ]
  },
  {
      "id":2,
     "shop":"vdfvddv",
     "options":[
         {
             "num":"2-1",
             "img":"static/a.png",
             "tit":"JUST Q 超有型 店主强烈推荐 时尚气质三色 宽松风衣短风衣外套 女",
             "intro":"卡色;均码",
             "price":"238.00",
             "count":"1",
             "state":false,
             "color":[
                 "卡色;均码",
                 "白色;均码",
                 "绿色;均码"
             ]
         }
     ]
  },
  
]
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3030,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    setup(app) {
      app.get('/some/path', function (req, res) {
          res.json(obj);
          console.log(111)
      });
    },
    proxyTable: {
      '/api':{
        //后台接口地址
        target:'http://localhost:9999',
        //这里可以模拟服务器进行get和post参数的传递
        changeOrigin:true,
        //前端所有的/api请求都会请求到后台的/api路径之下
        pathRewrite:{
          '^/api':'/api'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
