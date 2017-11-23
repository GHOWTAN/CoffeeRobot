const http = require('http');
const url = require('url');
const fs = require('fs');
var net = require('net');

// telnet
var user = 'admin' // this is a working user
var pass = 'admin'; // this is a working pass

// server
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (request, response) {
  var q = url.parse(request.url, true); // /robo?order=left
  console.log('new request: ' + request.url);
  if(q.pathname === '/robo') {          // /robo
    var qdata = q.query;                // ?order=left
    var txt = qdata.order;

    sendToTelnet(txt);

    //console.log(txt);

  } else {
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end("404 Not Found");
      }
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      return response.end();
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var conn = net.connect(7171, '192.168.200.49'); // telnet address for testing
conn.setEncoding('utf-8');

conn.on('connect', function() {
	console.log('connected to the server');
	// As soon as we connect, we log it
});

conn.on('data', function(data) {
	// every time the robo have data for you, he will call this
	// event, so you get a feedback

	//once the data get from robot it running, get data back
	//, every data get from server, it will run one time

	console.log('' + data);

	if (data.indexOf('username') != -1) {
	conn.write(user+'\r\n');

	} else if (data.indexOf('pass') != -1) {
	conn.write(pass+'\r\n');
	} 

});

function sendToTelnet(order) {
	
	conn.write(order+'\r\n');

	console.log('order: ' + order);
	//conn.write(direction+'\r\n');
}
