const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    historyApiFallback: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
  },
};
