module.exports = {
  entry: './shapes.js',
  
  module: {
    loaders:[{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  
  output: {
    path: './../dist/',
    filename: 'shapes.js'
  }
};