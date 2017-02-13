const webpack = require('webpack');
const path = require('path');

const isProd = (process.env.NODE_ENV === 'production');
const exclude = /(node_modules|bower_components)/;
const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  assets: path.resolve(__dirname, 'src/assets')
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: paths.dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [paths.src],
        exclude: [exclude],
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.scss$/,
        include: [paths.src],
        exclude: [exclude],
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        include: [paths.src],
        exclude: [exclude],
        use: ['preact-svg-loader']
      }
    ]
  },
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: false
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: paths.src,
    publicPath: '/'
  },
  plugins: setupPlugins()
};


function setupPlugins() {  
  
  let plugins = [];
  plugins.push(
    new webpack.DefinePlugin({'process.env': { 'NODE_ENV': process.env.NODE_ENV }})
  );
  
  if (isProd) {
    console.log('\x1b[36m%s\x1b[0m', '[INFO]: Building project for Production...\n');
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  } else {
    console.log('\x1b[36m%s\x1b[0m', '[INFO]: Building project for Development...\n');
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }
  return plugins;
}

