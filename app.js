var express = require('express')
var env = require('dotenv')
var connections = require("./connections")
var bodyparser = require('body-parser')

//Import services
var SensorService = require("./Services/Sensor")
const { response } = require('express')

//Configuation
env.config()
const app = express()
connections.connectToDb()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))


//MQTT, TODO Move to seperate module
MQTTclient = connections.connectToMQTTBroker()
MQTTclient.subscribe('#');
MQTTclient.on('message', function (topic, message) {
  // message is Buffer
  console.log(`topic: ${topic}, message: ${message.toString()}`)
})



app.get('/', (req, res) => {
  MQTTclient.publish("kim.kool", "{i:understand, j:son}")
  console.log(`is connected to broker: ${MQTTclient.connected}` ) 
  res.sendStatus(200)
})

app.get('/measurements', (req, res) => {
  SensorService.getSensors(req, res)
})

app.post('/measurements', (req, res) =>{
  SensorService.CreateTestSensorMeasurement(req,res)
})


app.listen(process.env.APP_PORT, () => {
  console.log(`app is listening on http://localhost:${process.env.APP_PORT}`)
})

