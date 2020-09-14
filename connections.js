var mongoose = require('mongoose');
var env = require('dotenv');
var MqttClient = require('mqtt');

exports.connectToDb = function(){
    
    mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
        if (err){
            console.log('connecting to database gave following error: ' + err)
        }else{
            console.log('connection to database established')
        }
        
    });
}

exports.connectToMQTTBroker = function(){
    let client  = MqttClient.connect(
        'mqtt://' + process.env.MQTT_ADDRESS,
        {
          port: +process.env.MQTT_PORT,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD
        })
        console.log(`is connected to broker: ${client.connected}` ) 
        return client;
}
