var amqp = require('amqp'), util = require('util'), net = require('net');

function RabbitFoot()
{
	amqp.Connection.call(this);
}

util.inherits(RabbitFoot, amqp.Connection);
exports.RabbitFoot = RabbitFoot;

RabbitFoot.prototype.createQueue = function(exhangeName, exchangeOptions, queueName, queueOptions, callback)
{
	var self = this;
	self.exchange(exhangeName, exchangeOptions, function(exchange)
	{
		var queue = self.queue(queueName,queueOptions, function(){
			queue.bind(exchange.name,queue.name);
		 	console.info('queue created: ' + queue.name);
		 	callback(exchange, queue);
		});
	});
	return self;
};

RabbitFoot.prototype.onReadyCreateQueue = function( exhangeName, exchangeOptions, queueName, queueOptions, callback )
{
	var self = this;
	self.on('ready', function(){
		self.createQueue( exhangeName, exchangeOptions, queueName, queueOptions, callback );
	} );
	return self;
}

exports.createConnection = function(connectionArgs, options){
	var rabbitFoot = new RabbitFoot();
	rabbitFoot.setOptions(connectionArgs);
  	rabbitFoot.setImplOptions(options);
  	rabbitFoot.reconnect();
 	return rabbitFoot;
}
