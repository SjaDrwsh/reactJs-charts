const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const babelConfig = require('../babel.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pathToRoot = path.resolve(__dirname, '..');
const pathToSrc = path.resolve(pathToRoot, './src');
const pathToBuild = path.resolve(pathToRoot, './build');
const pathToPublic = path.resolve(pathToRoot, './public');
const pathToPolyfills = path.resolve(pathToRoot, './config/polyfills.js');

module.exports = {
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
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.json'],
    alias: {
      // Tell semantic-ui-less where our theme.config is located.
      // @see https://medium.com/webmonkeys/webpack-2-semantic-ui-theming-a216ddf60daf
      // The alias, however, does also work from ts or js files, so that's not a good solution right now.
      '../../theme.config$': path.join(__dirname, '../src/theme.config'),
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
        // Fixes for quirky modules
        test: /\.m?js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...babelConfig,
            },
          },
          {
            test: /\.(?:le|c)ss$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            loader: require.resolve('less-loader'),
            options: {
              importLoaders: 1,
            },
          },
        ],
        include: [path.resolve(__dirname, '..', 'node_modules', 'regexpp')],
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
          from: './public/config',
          to: pathToBuild + '/config',
        },
      ],
    }),
  ],
  devServer: {
    contentBase: pathToPublic,
    historyApiFallback: true,
  },
};
