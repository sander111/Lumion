const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './app.js',
        path: path.resolve(__dirname, 'app')
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new MiniCssExtractPlugin({

            filename: 'css/app.css',
            chunkFilename: '[id].css',
            path: path.resolve(__dirname, './app/css')
        }),
        new CopyWebpackPlugin([
            {
            from: './src/fonts',
            to: './fonts'
          },
          {
            from: './src/img',
            to: './img'
          },

        ]),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
              }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './app/css',
                            minimize: true
                        }
                    },
                    { loader: "css-loader?url=false" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
            },
        ]
    },
}