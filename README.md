##Rabbitfoot

convenience methods for [node-amqp](https://github.com/postwait/node-amqp)   

###Usage

1.Publisher

```var rabbitFoot = require('rabbitFoot');       
	var rabbitFoot = rabbitFoot.createConnection({ url: 'amqp://localhost' })       
				.onReadyCreateQueue('tweet', {type:'fanout'},'',{durable:false, exclusive:true}, function(exchange, queue){      
					//Ready to publish   
					exchange.publish('', {data:'something'});   	
	});```

2.Consumer
```var rabbitFoot = require('rabbitFoot');   
rabbitFoot.createConnection({ url: 'amqp://localhost' })   
	.onReadyCreateQueue('tweet', {type:'fanout'},'',{durable:false, exclusive:true}, function(exchange, queue){   			 
		queue.subscribe(function (message, headers, deliveryInfo) {   
			//do something    
		});   
	});  
});```