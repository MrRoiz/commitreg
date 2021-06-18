const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry : './src/js/index',
	module : {
		rules : [
			{
				test : /\.vue$/,
				exclude : /node_modules/,
				use : {
					loader : 'vue-loader',
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins : [
		new VueLoaderPlugin(),
		new HTMLWebpackPlugin({
			hash : true,
			template : './src/html/index.html'
		})
	],
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
}