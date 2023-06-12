// pathモジュールの読み込み
const path = require("path");

//const webpack = require('webpack');

//const isProduction = env.production === true;

module.exports = {
  // モードを開発モードにする
  //mode: "production",
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',//"development",
  // 入力ファイル設定
  entry: [path.resolve(__dirname, "./src/index.ts")],
  // 出力ファイル設定
  output: {
    // 出力されるファイル名
    filename: "mainvisual.js",
    // 出力先ディレクトリ
    path: path.resolve(__dirname, "dist/mainvisual/js")
  },
 
  // モジュール設定
  module: {
    rules: [
      {
        // ts-loaderの設定
        test: /\.(js|ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /.(vert|frag|glsl)$/,
        use: ['raw-loader','glslify-loader'],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
    ]
  },
  
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
 
  devtool: "source-map",

  devServer: {
    contentBase: "./dist",
    open: true
  }
};