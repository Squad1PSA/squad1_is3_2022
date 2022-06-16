'use strict'

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/PSAProject");
autoIncrement.initialize(connection);
  
var taskSchema = new Schema({
  code:{
    type:Number,
  },
  priority: { 
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true,
    default: " "
  },
  effort:{
    type:Number,
    required: true,
  },
  resource: { 
    type: Number,
    required: true,
    default: 0
  },
});

taskSchema.plugin(autoIncrement.plugin, { //nuevo
  model: 'task', 
  field: 'code',
  startAt: 368,
  incrementBy:1
});

module.exports = mongoose.model("task", taskSchema);
