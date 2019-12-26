const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
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
