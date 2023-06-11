// ================================================= Пример на встроенном http server ======================================================================

// const server = http.createServer((request, response) => {
// 	switch (request.method) {
// 		case 'GET':
// 			switch (request.url) {
// 				case '/hello':
// 					response.statusCode = 200;
// 					response.setHeader('Content-Type', 'text/plain');
// 					response.end('Привет!');
// 					break;
// 			}
// 			break;
// 	}
// });

// server.listen(port, host, () => {
// 	console.log(`Сервер запущен на ${host}:${port}`);
// });

// ================================================= Пример на express ======================================================================
// то же самое приложение на экспресс

// import express from 'express';

// const port = 8000;

// const app = express();

// app.all('/hello', (request, response, next) => {
// 	console.log('All');
// 	next();
// });

// const calback = function (request, response, next) {
// 	console.log('callback1');
// 	next();
// };

// app
// 	.route('/user')
// 	.get('/hello', calback, (request, response) => {
// 		response.send('Привет!');
// 	})
// 	.post('/hello', (request, response) => {
// 		response.send('Привет post!');
// 	});

// app.listen(port, () => {
// 	console.log(`Сервер запущен на http://localhost:${port}`);
// });

// ================================================= ответ клиенту express ======================================================================

import express from 'express';
import { router } from './users/users.js';

const port = 8000;

const app = express();

app.use((req, res, next) => {
	console.log('Время ', Date.now());
	next();
});

app.get('/hello', (request, response) => {
	response.send('Привет');
});

app.use('/users', router);

app.use((err, req, res, next) => {
	console.log(err.message);
	res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
