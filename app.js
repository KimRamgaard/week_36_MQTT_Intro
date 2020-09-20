var express = require('express')
var env = require('dotenv')
var dbConnection = require("./DatabaseConnection")
var bodyparser = require('body-parser')

//Import services
var SensorService = require("./Services/Sensor")
const { response } = require('express')

//Configuation
env.config()
const app = express()
dbConnection.connectToDb()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))


//INIT MQTT
var mqttClient = require("./mqtt");
mqttClient.initMQTT();


app.get('/', (req, res) => {
  mqttClient.publishTestSensorMessage()
  res.sendStatus(200)
})

app.get('/measurements', (req, res) => {
  SensorService.getSensors(req, res)
})

app.get('/measurements/:location/:sensorName', (req, res) => {
  SensorService.getSensors(req, res)

})

app.post('/measurements', (req, res) =>{
  SensorService.CreateTestSensorMeasurement(req,res)
})


app.listen(process.env.APP_PORT, () => {
  console.log(`app is listening on http://localhost:${process.env.APP_PORT}`)
})

