const path = require('path')
const mkpath = require('mkpath')
const fsExtra = require('fs-extra')
const isProduction = process.env.FRIG_ENV === 'production'
const entry = {}

const example = (name) => {
  const relativePath = [name, name].join('/')
  const htmlSrc = `./src/${name}/index.html`
  const htmlDest = `./dist/${name}/index.html`

  entry[relativePath] = `./src/${relativePath}.jsx`

  if (!isProduction) return undefined

  mkpath.sync(path.dirname(htmlDest))

  return fsExtra.copySync(htmlSrc, htmlDest)
}

if (isProduction) {
  example('the-basics')
} else {
  example('kitchen-sink')
  example('horizontal-login')
  example('the-basics')
  example('two-way-data-binding')
  example('component-functions')
}

module.exports = {
  entry,
  devtool: 'inline-source-map',
  output: {
    path: isProduction ? './dist' : './examples',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      frig: path.resolve('./node_modules/frig/src/index.js'),
      'frigging-bootstrap': path.resolve(
        './node_modules/frigging-bootstrap/src/javascripts/index.js'
      ),
    },
  },
  devServer: {
    contentBase: './src',
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: ['babel-plugin-transform-decorators-legacy'],
        },
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
      },
    ],
  },
}
