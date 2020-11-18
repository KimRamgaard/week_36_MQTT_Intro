//Main application of node server

var express = require('express')
var env = require('dotenv')
var dbConnection = require("./DatabaseConnection")
var bodyparser = require('body-parser')

//Import services
var SensorService = require("./Services/Sensor")


//Configuation
env.config() // setup the configuation variables
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
dbConnection.connectToDb()
app.use(express.static(__dirname))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))


//Socket IO stuff TODO MOVE to seperate module
io.on('connection', (socket) => {
  console.log('a user connected with id ' + socket.id);
  //ChartJS  Stuff TODO Move to seperate module
  var SensorChartData =  SensorService.getSensorChartData()
  io.emit('startChart', SensorChartData)
});




//Initiates MQTT connection and adds subscriber
var mqttClient = require("./mqtt");
const { emit } = require('process')
mqttClient.initMQTT(io);

//Routes
//Used as a tester for publishing a message via MQTT
app.get('/testdata', (req, res) => {
  mqttClient.publishTestSensorMessage()
  res.sendStatus(200)
})

//Get all measurements
app.get('/measurements', (req, res) => {
  SensorService.getSensors(req, res)
})

//Get all depending on location and sensorName
app.get('/measurements/:location/:sensorName', (req, res) => {
  SensorService.getSensors(req, res)

})

//Used to test with a post (not through MQTT)
app.post('/measurements', (req, res) =>{
  SensorService.CreateTestSensorMeasurement(req,res)
})


http.listen(process.env.APP_PORT, () => {
  console.log(`app is listening on http://localhost:${process.env.APP_PORT}`)
})

