/*
* @Author: Administrator
* @Date:   2018-10-29 16:44:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-08 15:34:47
*/

'use strict';

var http = require('http');
var fs = require('fs');
// var stream = require('stream');

http.createServer(function(request, response) {
	if (request.url !== '/favicon.ico') {
		
		var readable = fs.createReadStream('sample.txt', 'utf-8');
		// var writable = fs.createWriteStream('sample.txt');
		var body = '';

		readable.pause();
		console.log(readable.isPaused() + '===============isPaused');
		// data 事件，有数据时候触发
		readable.on('data', function(chunk) {
			console.log(readable.isPaused() + '========DATA=======isPaused');
			console.log('DATA');
			body += chunk;
			response.write(body);
		});

		// 在数据块可以从流中读取的时候触发，callback没有参数，可以在处理器中调用read([size])方法读取数据。
		readable.on('readable', function() {
			console.log(readable.isPaused() + '=========readable======isPaused');
			console.log('readable');
			var someStr = readable.read(5);
			console.log(someStr)
			if (someStr !== null) {
				response.write(someStr);
			} else {
				response.write('end from readable...');
			}
			// readable.resume();
		});

		// 没数据刻度时候触发
		readable.on('end', function() {
			console.log('end')
			body += 'end';
			response.write(body);
			// var writable = fs.createWriteStream('sample.txt');
			// writable.write(body, 'utf-8');
			response.end('');
		});
		// 当所有数据都被写入到底层的时候触发；
		readable.on('finish', function () {
			console.log('this is finish...');
			response.end('');
		})
		// 在接收和读写的过程中触发
		readable.on('error', function(err) {
			console.log('ERROR');
			response.write(err);
        	// response.end('');
		})
	};
}).listen(8888);

console.log('Server running at http://localhost:8888');
