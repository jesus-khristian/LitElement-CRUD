const path = require ('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const MiniCssExtractPlugin = require ('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
    entry:{
      app:[
        '@babel/polyfill',
        './src/app-consults.js'
      ]
    },
    devtool: 'source-map',
    devServer:{
      contentBase: './dist'
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:'./public/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
      }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].bundle.css'
      })
    ],
    output:{
      filename:'[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module:{
      rules:[
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
        {
          test: /\.css$/,
          use:[
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: 'file-loader'
        }
      ]
    }
}






