const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
	context: path.join(__dirname),

	entry: ['./src/index.jsx'],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.[hash].js'
	},

	devtool: 'cheap-module-source-map',
	// devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: [
					{
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
				use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},

	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				context: __dirname
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new WebpackNotifierPlugin(),
		new CleanWebpackPlugin(['dist']),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({name: 'commons', filename: 'commons.[hash].js', minChunks: Infinity}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				warnings: false
			},
			comments: false
		}),
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
		extensions: ['.js', '.jsx', '.css', '.scss']
	}
};
