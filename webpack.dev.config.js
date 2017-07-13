const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {

	entry: [
		'./src/index.jsx', 'webpack-dev-server/client?http://0.0.0.0:3001', 'webpack/hot/only-dev-server'
	],

	output: {
		path: '/',
		filename: 'bundle.js'
	},

	devtool: 'eval-source-map',

	devServer: {
		hot: true,
		compress: false,
		inline: true,
		filename: 'bundle.js',
		publicPath: '/',
		historyApiFallback: true,
		contentBase: path.join(__dirname, '/dist/'),
		disableHostCheck: true,
		proxy: {
			'*': 'http://localhost:3000'
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'react-hot-loader'
					}, {
						loader: 'babel-loader',
						options: {
							sourceMap: true,
							cacheDirectory: true
						}
					}, {
						loader: 'eslint-loader',
						options: {
							failOnError: true
						}
					}
				]
			}, {
				// ASSET LOADER
				// Reference: https://github.com/webpack/url-loader
				// Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
				// Rename the file using the asset hash
				// Pass along the updated reference to your code
				// You can add here any file extension you want to get copied to your output
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp4)([?]?.*)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[hash].[ext]'
						}
					}
				]
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({cache: true, debug: true, minimize: false}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new WebpackNotifierPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true
			}
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	}
};
