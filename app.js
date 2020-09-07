var express = require('express')
var mqtt = require('mqtt')
var env = require('dotenv')


env.config();
const app = express()


let MQTTclient  = mqtt.connect(
  'mqtt://' + process.env.MQTT_ADDRESS,
  {
    port: +process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  })

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

app.get('/rest', (req, res) => {
  res.send('very restfull')
})


app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})




