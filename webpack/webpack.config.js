import path from 'path';
import webpack from 'webpack';

module.exports = {
  context: path.resolve(__dirname, '.'),
  
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
    vendor: [
      'babel-polyfill',
      'prop-types',
      'react',
      'react-dom',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    sourceMapFilename: '[name].map',
  },

  resolve: {
    extensions: ['.js', '.jsx', ],
  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
  ],
};