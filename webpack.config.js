const path = require("path");
const webpack = require("webpack");

module.exports = {
  watch: true,
  entry: {
    App: "./src/App.jsx"},
  mode: "production",
  module: {
    rules: [
      {
	test: /\.s[ac]ss$/i,
	use: [
	  // Creates `style` nodes from JS strings
	  'style-loader',
	  // Translates CSS into CommonJS
	  'css-loader',
	  // Compiles Sass to CSS
	  'sass-loader',
	],
      },
      {
	test: /\.jsx$/,
	exclude: /node_modules/,
	use:{
	  loader: "babel-loader",
	  options: { presets: ["@babel/env"] }
	}
      },
      {
	test: /\.css$/,
	use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: "/home/davidweisss/bittwitter/public",
    filename: "[name].js"
  }
}
