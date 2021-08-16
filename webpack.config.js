const path = require('path')
const miniCss = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	// watch: true,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.(s*)css$/,
				use: [miniCss.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new miniCss({
			filename: 'style.css',
		}),
	],
}
