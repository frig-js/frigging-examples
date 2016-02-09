ExtractTextPlugin = require "extract-text-webpack-plugin"
path = require "path"
webpack = require "webpack"
_ = require "lodash"
mkpath = require 'mkpath'
fsExtra = require "fs-extra"

isProduction = process.env.FRIG_ENV == "production"

entry = {}

example = (name, type) ->
  relativePath = [name, name].join("/")
  entry[relativePath] = "./src/#{relativePath}.jsx"
  # Copy the html outside of webpack
  return unless isProduction
  htmlSrc = "./src/#{name}/index.html"
  htmlDest = "./dist/#{name}/index.html"
  mkpath.sync path.dirname htmlDest
  fsExtra.copySync htmlSrc, htmlDest

if isProduction
  example "the-basics"
else
  example "kitchen-sink"
  example "horizontal-login"
  example "the-basics"
  example "two-way-data-binding"
  example "component-functions"

module.exports =
  entry: entry
  devtool: "inline-source-map"
  output:
    path: if isProduction then "./dist" else "./examples"
    filename: "[name].js"
  resolve:
    alias:
      "react": path.resolve('./node_modules/react')
      "react-dom": path.resolve('./node_modules/react-dom')
      "frig": path.resolve('./node_modules/frig/src/javascripts/index.js')
      "frigging-bootstrap": path.resolve('./node_modules/frigging-bootstrap/src/javascripts/index.js')
  devServer:
    contentBase: "./src",
  module:
    loaders: [
      {
        test: /\.styl$/
        loader: "style-loader!css-loader!stylus-loader"
      }
      {
        test: /\.jsx?$/
        exclude: /^(node_modules|dist|scripts)/
        loader: "babel?stage=0"
      }
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: "url-loader"
      }
    ]
