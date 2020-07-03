const path = require('path');//引入path模块

module.exports = {
    pages: {
        index: {
            entry: 'src/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',

        },
        aindex: {
            entry: 'src/pages/aindex/main.js',
            template: 'public/aindex.html',
            filename: 'aindex.html',

        },
    },
    // 基本路径
    // publicPath: 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/',
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    //  assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    runtimeCompiler: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                'styles': path.join(__dirname, 'src/assets/styles'),
                'components': path.join(__dirname, 'src/components')
            }
        }
    },
    filenameHashing: false,
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/assets/js/variables.scss";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode

    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: null// 设置代理

    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
