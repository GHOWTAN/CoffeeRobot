'use strict';

var net = require('net');

class Robot {
  init(ip, port, user, passwd) {
    var telnetConn = net.connect(port, ip); // telnet address for testing
    telnetConn.setEncoding('utf-8');

    telnetConn.on('connect', function() {
    	console.log('connected to the server');
    	// As soon as we connect, we log it
    });

    telnetConn.on('data', function(data) {
    	// every time the robo have data for you, he will call this
    	// event, so you get a feedback

    	//once the data get from robot it running, get data back
    	//, every data get from server, it will run one time

    	console.log('' + data);

    	if (data.indexOf('username') != -1) {
    	   telnetConn.write(user + '\r\n');
    	} else if (data.indexOf('pass') != -1) {
    	   telnetConn.write(pass + '\r\n');
    	}

    });

    this.conn = telnetConn;
  }

  send(order) {
    this.conn.write(order + '\r\n');
  }
}

module.exports = Robot;
