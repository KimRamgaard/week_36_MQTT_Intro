var sensorMeasure = require("./../models/SensorMeasurement")


exports.getSensors = function(request,response){
    
    sensorMeasure.find(request.params,function(err, queryResult){
        if(err){
            response.status(400).send("got following error when querying for sensors: " + err)
        }else{
            response.status(200).json(queryResult);
        }
    })
    
}


exports.CreateTestSensorMeasurement = function(request,response){
    
    var SensorMeasurement = new sensorMeasure({
        location: request.body.sensorMeasurement.location,
        sensorName: request.body.sensorMeasurement.sensorName,
        temperature: request.body.sensorMeasurement.temperature,
        pressure: request.body.sensorMeasurement.pressure,
        humidity: request.body.sensorMeasurement.humidity
    })


    SensorMeasurement.save(function (err) {
        if(err){
            response.status(400).send('could not save data. Error: ' + err )
        } else{
            response.sendStatus(200)
        }
    })    
}