var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
schemaoptions = new Schema.schemaoptions({
    createdAt: 'created_at',

})
*/


var sensorMeasurement = new Schema({
    //id: {type: String, required: true},
    
    location: String,
    sensorName: String,
    temperature: mongoose.SchemaTypes.Decimal128,
    pressure: mongoose.SchemaTypes.Decimal128,
    humidity: mongoose.SchemaTypes.Decimal128
},);

module.exports = mongoose.model('sensorMeasurement', sensorMeasurement)