var mongoose = require('mongoose');


exports.connectToDb = function(){
    
    mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        if (err){
            console.log('connecting to database gave following error: ' + err)
        }else{
            console.log('connection to database established')
        }
        
    });
}

/*
exports.connectToMQTTBroker = function(){
    const url = 'mqtt://' + process.env.MQTT_ADDRESS;
    var options = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    }
    
    var client  = MqttClient.connect(url, options)
        console.log(`is connected to broker: ${client.connected}` ) 
        
        return client;
}
*/
