const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelConfig = require('../babel.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pathToRoot = path.resolve(__dirname, '..');
const pathToSrc = path.resolve(pathToRoot, './src');
const pathToBuild = path.resolve(pathToRoot, './build');
const pathToPublic = path.resolve(pathToRoot, './public');
const pathToPolyfills = path.resolve(pathToRoot, './config/polyfills.js');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: [pathToPolyfills, path.resolve(pathToSrc, 'index.tsx')],
  },
  output: {
    path: pathToBuild,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    // resolve imports with file extension name
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '../../theme.config$': path.join(__dirname, '/semantic-ui/theme.config'),
      '../semantic-ui/site': path.join(__dirname, '/semantic-ui/site'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  module: {
    rules: [
      {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
        test: /\.less$/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...babelConfig,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...babelConfig,
            },
          },
        ],
        include: [path.resolve(__dirname, '..', 'node_modules', 'regexpp')],
      },
      {
        test: /\.(sass|less|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff2?|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(pathToPublic, 'index.html'),
      chunks: ['index', 'commons'],
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './config',
          to: pathToBuild + '/config',
        },
      ],
    }),
    // new Serve({ static: pathToBuild }),
  ],
  devServer: {
    path: pathToBuild,
    compress: true,
    port: 9000,
    hot: true,
    host: 'localhost',
    https: true,
    pathToPublic: '/',
  },
};
