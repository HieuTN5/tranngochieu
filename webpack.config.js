const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'], // Ensure SCSS files are recognized
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};