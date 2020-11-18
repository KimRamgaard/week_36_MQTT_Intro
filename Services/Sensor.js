//contains businesslogic related to sensor data (in this case all logic related to the REST service)

var SensorSchema = require("./../models/SensorMeasurement")

exports.getSensors = function(request,response){
    
    SensorSchema.find(request.params,function(err, queryResult){
        if(err){
            response.status(400).send("got following error when querying for sensors: " + err)
        }else{
            response.status(200).json(queryResult);
        }
    })
    
}

exports.CreateTestSensorMeasurement = function(request,response){
    
    var SensorMeasurement = new SensorSchema({
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

exports.getSensorChartData = function(){  
    var labels = [];
    var tempData = [];
    
    SensorSchema.find({}, (err, sensordata) => {
        if(err) {
            console.log(err);
            return;
        }
        
        sensordata.forEach(function(sensorDatapoint){
            labels.push(sensorDatapoint.get('createdAt')) 
            tempData.push(sensorDatapoint.get('temperature'))
        })

        
    });

    return  {
        labels,
        tempData: [{
            label: 'Temperature',
            data: tempData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'

            ],
            borderWidth: 1
        }]
    };



}
