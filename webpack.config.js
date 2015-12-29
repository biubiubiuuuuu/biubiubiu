/**
 * Created by Nemo on 15/12/17.
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  plugins: [
    //new HtmlWebpackPlugin({
    //  hash: true
    //})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader', 'babel']
      },
      {
        test: /\.css/, loader: "style!css"
      },
      {
        test: /\.less$/, loader: "style!css!less"
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    inline: true,
    contentBase: 'public',
    proxy: {}
  }
};