/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "cheap-module-source-map",
  entry: ["./client/app/index.js"],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2'],
          }
        }
      }
    ]
  },
  output: {
    path: __dirname + "/client/dist",
    filename: "app.min.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourcemap: false,
      parallel: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      },
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
};
