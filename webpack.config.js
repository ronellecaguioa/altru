const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    hot: true, 
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000'
    }
  },
};
