var sensorMeasure = require("./models/SensorMeasurement")
var MqttClient = require('mqtt');

var myMQTTClient;

exports.initMQTT = function(){
    connectToMQTTBroker();
    myMQTTClient.subscribe('#');
    myMQTTClient.on('message', function (topic, message) {
        saveMessage(topic, message)
    })
}


exports.publishTestSensorMessage = function(){
    const sensorstring = ["badevaerelse1", "badevaerelse2" ]
    
    topic = "Sensor"
    var message = JSON.stringify({
        location: "lindelunden48",
        sensorName: (Math.random() < 0.5 ? sensorstring[0] : sensorstring[1]),
        temperature: (Math.random() * 15 + 20),
        pressure: (Math.random() * 900 + 101000),
        humidity: (Math.random() * 90 + 10)
    })

    myMQTTClient.publish(topic, message)
    
    console.log(`send testmessage: ${message}` ) 

}

saveMessage = function(topic, message){
    switch(topic){
        case "Sensor":
            saveSensorData( message)
            break;
        default:
            "Recieved unknow topic: " + topic
        
    }
}

const saveSensorData = function(message){
    const jsonMessage = JSON.parse(message);

    var SensorMeasurement = new sensorMeasure({
        location: jsonMessage.location,
        sensorName: jsonMessage.sensorName,
        temperature: jsonMessage.temperature,
        pressure: jsonMessage.pressure,
        humidity: jsonMessage.humidity
    })


    SensorMeasurement.save(function (err) {
        if(err){
            console.log(err)
        }
    })   
}

const connectToMQTTBroker = function(){
    const url = 'mqtt://' + process.env.MQTT_ADDRESS;
    var options = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    }
    
    myMQTTClient  = MqttClient.connect(url, options)
    console.log(`connected to MQTT Broker` ) 

}
