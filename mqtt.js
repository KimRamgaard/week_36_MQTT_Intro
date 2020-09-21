//contains all business logic related to MQTT
var sensorMeasure = require("./models/SensorMeasurement")
var MqttClient = require('mqtt');

var myMQTTClient;
var IOSocket

//Called in App.js
// Connects to MQTT Broker and subscribes to everything from that broker.
// adds a callback when a message is recieved and saves that message to the database
exports.initMQTT = function(io){
    IOSocket = io
    myMQTTClient = connectToMQTTBroker();
    myMQTTClient.subscribe('#');
    myMQTTClient.on('message', function (topic, message) {
        saveMessage(topic, message); 
    })
    
}

//publishes a random sensor message to the topic "Sensor". 
//following the structure of Jeppes sensor data (though with JSON Structure)
exports.publishTestSensorMessage = function(){
    const localConnection = connectToMQTTBroker();    
    const sensorstring = ["badevaerelse1", "badevaerelse2" ]
    
    topic = "Sensor"
    var message = JSON.stringify({
        location: "lindelunden48",
        sensorName: (Math.random() < 0.5 ? sensorstring[0] : sensorstring[1]),
        temperature: (Math.random() * 15 + 20),
        pressure: (Math.random() * 900 + 101000),
        humidity: (Math.random() * 90 + 10)
    })

    localConnection.publish(topic, message)
    
    console.log(`send testmessage: ${message}` ) 

}

//facade pattern to save message to database (only contains Sensor for now)
saveMessage = function(topic, message){
    switch(topic){
        case "Sensor":
            saveSensorData( message)
            break;
        default:
            "Recieved unknow topic: " + topic
        
    }
}

//stores Sensor data into the database using the mongoose schema
const saveSensorData = function(message){
    const jsonMessage = JSON.parse(message);

    

    const SensorMeasurement = new sensorMeasure({
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
    IOSocket.emit('SensorDataRecieved', jsonMessage);  
}

//Connects to MQTT Broker
const connectToMQTTBroker = function(){
    const url = 'mqtt://' + process.env.MQTT_ADDRESS;
    var options = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    }
    
    return myMQTTClient  = MqttClient.connect(url, options)

}
