const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require("path")
const webpack = require("webpack")
const _ = require("lodash")
const mkpath = require('mkpath')
const fsExtra = require("fs-extra")
const isProduction = process.env.FRIG_ENV === "production"
const entry = {}

const example = (name, type) => {
  const relativePath = [name, name].join("/")
  const htmlSrc = "./src/" + name + "/index.html"
  const htmlDest = "./dist/" + name + "/index.html"

  entry[relativePath] = "./src/" + relativePath + ".jsx"

  if (!isProduction) return

  mkpath.sync(path.dirname(htmlDest))

  return fsExtra.copySync(htmlSrc, htmlDest)
}

if (isProduction) {
  example("the-basics")
} else {
  example("kitchen-sink")
  example("horizontal-login")
  example("the-basics")
  example("two-way-data-binding")
  example("component-functions")
}

module.exports = {
  entry: entry,
  devtool: "inline-source-map",
  output: {
    path: isProduction ? "./dist" : "./examples",
    filename: "[name].js"
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      "react-dom": path.resolve('./node_modules/react-dom'),
      frig: path.resolve('./node_modules/frig/src/index.js'),
      "frigging-bootstrap": path.resolve('./node_modules/frigging-bootstrap/src/javascripts/index.js')
    }
  },
  devServer: {
    contentBase: "./src"
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader"
      }, {
        test: /\.jsx?$/,
        loader: "babel",
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: "url-loader"
      }
    ]
  }
}