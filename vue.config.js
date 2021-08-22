const path = require('path');
module.exports = {
  // 配置方式一： cli提供的属性
  outputDir: './build',
  // publicPath: './', //生产的时候要去掉
  // 配置方式二： 和webpack属性完全一致，最后会合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       // vue中@默认表示src文件夹
  //       components: '@/components'
  //     }
  //   }
  // }
  // 也是修改webpack的配置： config拿到所有的webpack配置，在下面覆盖
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    };
  }

  // 配置方式三
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components');
  // }
};
