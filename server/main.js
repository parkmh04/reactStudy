import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
const app = express();
const port = 3000;
const devPort = 3001;

if (process.env.NODE_ENV == 'development') {
	const config = require('../webpack.dev.config');
	const compiler = Webpack(config);
	const devServer = new WebpackDevServer(compiler, config.devServer);
	devServer.listen(devPort,'0.0.0.0', () => {
		console.log(`Listening on port: ${devPort}`);
	});
}

app.use('/', express.static(__dirname + '/../dist'));

import posts from './routes/posts';
app.use('/posts', posts);

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
