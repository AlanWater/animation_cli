const HtmlWebpackPlugin = require('html-webpack-plugin'),
    isProduction = process.env.NODE_ENV === 'production',
    isDevelopment = process.env.NODE_ENV === 'development',
    { path, root, src, dist, node_modules } = require('../path');

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(src, 'index.tsx'),
    output: {
        path: dist,
        filename: 'bundle.js',
        publicPath: '/'
    },
    // devtool: 'inline-source-map',
    devServer: {
        open: true, // 自动打开浏览器
        port: 3000, // devServer对应的端口号
        hot: true,
        inline: true
    },
    module: {
        rules: [{
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /(node_modules|dist)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'react']
                }
            }
        }]
    },
    resolve: {
        modules: [
            //优先找src目录下的业务模块，没有才去node_modules里找静态包
            src,
            node_modules
        ],
        extensions: ['.js', '.json', '.jsx', '.css', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
module.exports = webpackConfig;