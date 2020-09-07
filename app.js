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

  MQTTclient.on('connect', function () {
  console.log('Connected to mqtt client');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

MQTTclient.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  // client.end()
})


MQTTclient.subscribe('#');


app.get('/', (req, res) => {
  MQTTclient.publish("kim.kool", "{i:understand, j:son}")
  res.send('Hello World!')
})

app.get('/rest', (req, res) => {
  res.send('very restfull')
})

