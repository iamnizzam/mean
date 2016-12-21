'use strict';

/**
 * Module dependencies.
 */
var cluster = require('cluster'),
     os = require('os');

var app = require('./config/lib/app');
var numCPUs = os.cpus().length;


if (cluster.isMaster) {

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
 cluster.on('exit', function (worker) {
   console.log('worker ' + worker.process.pid + ' died');
    cluster.fork()
 });
  
} else {
    var server = app.start();
}

