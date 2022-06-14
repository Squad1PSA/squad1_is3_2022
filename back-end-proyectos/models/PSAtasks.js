'use strict'

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  

var taskSchema = new Schema({
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

module.exports = mongoose.model("task", taskSchema);
