/** 
	webpack配置文件
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 把CSS文件提取为独立的文件

module.exports = {
  // 入口
  entry: './src/app.jsx',
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component')
    }
  },
  // loaders
  module: {// 各种loader配置，在代码中import其他类型文件时，使用前，先用对应的loader
    rules: [
      { // 配置jsx文件babel转换loader
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }, 
      { // 配置css-loader
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { // 配置sass-loader
        test: /\.scss$/,
        use: [{
            loader: "style-loader" 
        }, {
            loader: "css-loader" 
        }, {
            loader: "sass-loader" 
        }]
      },
      { // 配置图片loader
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'  //在resource文件下，[name]输入文件名,[ext]文件扩展名
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
    // 独立的css文件
    new ExtractTextPlugin('css/[name].css'),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ],
  // 热加载服务器
  devServer: {
    contentBase: './dist',
    port: 8086,
    //路径没有找到时，返回到指定的路径
    historyApiFallback: {
      index: '/index.html'
    }
  }
};