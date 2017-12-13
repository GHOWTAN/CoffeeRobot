const http = require('http');
const url = require('url');
const fs = require('fs');
const Robot = require('./robot');

// ============================================================
// variables

// create robot instance
var coffeeRobot = new Robot();

// telnet
var telnet_ip = '192.168.200.49';
var telnet_port = 7171;
var telnet_user = 'admin';
var telnet_pass = 'admin';

// own server
const hostname = '127.0.0.1';
const port = 3000;

// ============================================================
// init

const server = http.createServer(function (request, response) {
  console.log('new request: ' + request.url);

  var q = url.parse(request.url, true); // /robo?order=left
  if(q.pathname === '/robo') {          // /robo
    var qdata = q.query;                // ?order=left
    var txt = qdata.order;

    coffeeRobot.send(txt);
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

coffeeRobot.init(telnet_ip, telnet_port, telnet_user, telnet_pass);

// ============================================================
// run

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
