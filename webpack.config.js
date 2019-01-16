const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const autoprefixer = require("autoprefixer");

function join(...args) {
	//path.join()方法拼接路径，并返回该路径，结合__dirname可以达到path.resolve()方法同样的效果
	//返回D:\a\b\c\d ,path.resolve返回当前环境所在路径拼接参数字符串所得到的绝对路径，其中参数可以有多个
	return path.join(__dirname, ...args);
}

module.exports = {
	mode: "development",
	performance: {
		hints: false
	},
	entry: join("./src/main.js"),
	output: {
		filename: "bundle.js",
		path: join(__dirname, "dist")
	},
	// 使用source map 追踪到错误和警告在源码中的位置
	devtool: "inline-source-map",
	devServer: {
		// 告诉开发服务器在哪里查找文件
		contentBase: "./dist",
		// 热模块替换
		hotOnly: true,
		port: 8080,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				secure: false,
				changeOrigin: true,
				pathRewrite: {"^/api": ""}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer({
									browsers: [
										"> 0.01%"
									]
								})
							]
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: ["vue-loader"]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"]
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			template: join("src/index.html")
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin()
	]
};