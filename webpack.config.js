const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
	context: path.join(__dirname),

	entry: ['./src/index.jsx'],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	// devtool: 'cheap-module-source-map',
	devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: { sourceMap: true, cacheDirectory: true }
					}, {
						loader: 'eslint-loader',
						options: {
							failOnError: true
						}
					}
				]
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
			}
		]
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new WebpackNotifierPlugin(),
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: 'commons.js', minChunks: Infinity}),
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
		extensions: ['.js','.jsx', '.css']
	}
};
