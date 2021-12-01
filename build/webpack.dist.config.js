const { merge } = require("webpack-merge");
const defaultConfig = require("./webpack.default.config");

module.exports = merge(defaultConfig, {
  entry: path.resolve(__dirname, "../test/src/index.ts"),
  mode: "production",
  devServer: undefined,
});
