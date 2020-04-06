const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Data for Democracy",
      template: "./client/src/index.html",
    }),
  ],
  devServer: {
    contentBase: "./dist",
    port: 3000,
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        secure: false,
        // changeOrigin: true
      },
    },
  },
};
