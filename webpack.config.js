const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
  mode: "production", //"development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "game.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning", // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [["optipng", { optimizationLevel: 5 }]],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
        { from: "audios", to: "audios" },
      ],
    }),
  ],
};
