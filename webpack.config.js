const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html')
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: "./images/[name][ext][query]",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        ],
      },
    }
