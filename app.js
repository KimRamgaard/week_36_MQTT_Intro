const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var mqtt = require('mqtt')

let MQTTclient  = mqtt.connect(
  'mqtt://' + process.env.MQTT_ADDRESS,
  {
    port: +process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  })

app.get('/', (req, res) => {
  console.log("is connected to broker: " + MQTTclient.connected) 
})

MQTTclient.subscribe('#');

MQTTclient.on('message', function (topic, message) {
  // message is Buffer
  
  console.log(message.toString())
  //MQTTclient.end()
})

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`)
})

/*
app.get('/', (req, res) => {
  MQTTclient.publish("kim.kool", "{i:understand, j:son}")
  res.send('Hello World!')
})

app.get('/rest', (req, res) => {
  res.send('very restfull')
})
*/
