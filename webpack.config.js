const path = require("path");
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry,
    frontend: path.resolve(process.cwd(), "src", "frontend.js")
  },
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        use: ["url-loader"]
      }
    ]
  }
};
