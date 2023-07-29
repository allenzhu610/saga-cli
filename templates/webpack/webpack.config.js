const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

function isBuild(){
    console.log(process.env.NODE_ENV)
    return process.env.NODE_ENV=="production";
} 

function isDev(){
    console.log(process.env.NODE_ENV)
    return process.env.NODE_ENV=="development";
}

function assetsPath(_path) {
    return path.posix.join('assets', _path)
}

/**
 * 区分使用chunkhash、hash
 * chunkhash、会计算文件内容、判断是否生成新的hash、增加编译时间
 * @param {String} type 文件类型
 * @returns {*}
 */
function fileName(type) {
    if (process.env.NODE_ENV === 'production') {
        if (type == "css") {
            return 'modules/styles/[name].[chunkhash].css';
        }
        return 'modules/[name].[chunkhash].js';
    } else {
        if (type == "css") {
            return 'modules/styles/[name].[hash].css';
        }
        return 'modules/[name].[hash].js';
    }
}


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var config={
    entry: {
        app: "./src/main.jsx",
        //新增vendor包chunk、便于独立打包
        vendor: ['react','antd','react-redux','redux','redux-saga','react-dom','react-router','react-router-dom','axios']
    },
    output: {
        filename: fileName(),
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist',
        port: 7777,
        host: 'localhost',
        proxy: {
            '/mock': {
                target: 'http://112.74.74.189',
                pathRewrite: {'^/api': '/'},
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [{
                //开启缓存优化
                loader: 'babel-loader?cacheDirectory',
            }],
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            //用插件抽取css独立打包、配置打包输出路径
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                publicPath: "../../",
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                publicPath: "../../",
                use: 'css-loader!less-loader'
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name: assetsPath('images/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                name: assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.html",
            title: 'Development'
        }),
        new ExtractTextPlugin(fileName("css"))
    ]
}

if(isDev()){
    config.plugins=config.plugins.concat([
        new WebpackBrowserPlugin(),
        new DuplicatePackageCheckerPlugin()
    ])
}

if(isBuild()){
    config.plugins=config.plugins.concat([
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            sourceMap: true,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句、还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports = config;