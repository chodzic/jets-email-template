const path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var HtmlWebpackInlineStylePlugin = require('html-webpack-inline-style-plugin');
const webpack = require('webpack');


module.exports = {
  devServer: {
   writeToDisk: true,
   port: 9000,
   // contentBase: path.join(__dirname, 'src'),
   // watchContentBase: true,
 },
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env']
            }

          }
        ]
      },
      {
      test: /\.scss$/,
      use: [
        {
        loader: MiniCssExtractPlugin.loader
      },
      "css-loader",
      "sass-loader"
      ]
    },
    {
    test: /\.html$/,
    use: [{
      loader: 'html-loader'
    }]
  },
  {
    test: /\.(jpg|png|gif)$/,
    use: [{
      loader: 'file-loader',
      options:{
        name: '[name].[ext]',
        outputPath: 'images/',
        publicPath: 'images/'
      }
    }]
  }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inlineSource: '.(css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackInlineStylePlugin(),
    new CleanWebpackPlugin({dist: 'dist'}),

  ]
};
