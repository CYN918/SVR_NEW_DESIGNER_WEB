const path = require('path');

module.exports = {
    pages: {
        app: {
            entry: 'src/pages/index/main.js',
            template: 'public/index.html',
            filename: 'index.html',

        }
    },
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: false,
    // webpack配置
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                'styles': path.join(__dirname, 'src/assets/styles'),
                'components': path.join(__dirname, 'src/components'),
                'common': path.join(__dirname, 'src/common'),
                'utils': path.join(__dirname, 'src/common/utils'),
                'api': path.join(__dirname, 'src/api'),
                'assets': path.join(__dirname, 'src/assets'),
            }
        }
    },
    filenameHashing: false,
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
    parallel: require('os').cpus().length > 1,
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

    }
}
