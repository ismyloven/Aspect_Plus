const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
entry: './src/main.js',
	mode: "production",
	output: {
	filename: 'main.js',
	path: path.resolve(__dirname, './dist/js')
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: "../index.html",
			template: path.resolve(__dirname, "./src/index.html")
		})
	]
};
