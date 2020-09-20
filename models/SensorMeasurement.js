//contains the mongoose schema for sensorMeasurement

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SchemaOptions = {
    timestamps: true
  };



var sensorMeasurement = new Schema({
    //id: {type: String, required: true},
    
    location: String,
    sensorName: String,
    temperature: mongoose.SchemaTypes.Decimal128,
    pressure: mongoose.SchemaTypes.Decimal128,
    humidity: mongoose.SchemaTypes.Decimal128
},SchemaOptions)

module.exports = mongoose.model('sensorMeasurement', sensorMeasurement)