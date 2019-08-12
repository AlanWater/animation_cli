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
        }, {
            test: /\.tsx?$/,
            use: {
                // loader: 'ts-loader'
                loader: 'awesome-typescript-loader'
            }
        }, {
            test: /\.(css|scss)$/,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    // options: {
                    //     root: "/", //修改css中url指向的根目录, 默认值为/, 对于绝对路径, css-loader默认是不会对它进行处理的
                    //     modules: false, //开启css-modules模式, 默认值为flase
                    //     localIdentName: "[name]-[local]-[hash:base64:5]", //设置css-modules模式下local类名的命名
                    //     minimize: false, //压缩css代码, 默认false
                    //     camelCase: false, //导出以驼峰化命名的类名, 默认false
                    //     import: true, //禁止或启用@import, 默认true
                    //     url: true, //禁止或启用url, 默认true
                    //     sourceMap: false, //禁止或启用sourceMap, 默认false
                    //     importLoaders: 0, //在css-loader前应用的loader的数目, 默认为0
                    //     alias: {} //起别名, 默认{}
                    // }
                }
            ]
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