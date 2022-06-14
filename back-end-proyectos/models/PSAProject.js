'use strict'

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var projectSchema = new Schema({
  code: { 
    type: String,
    required: true,
    default: "p123"
  },
  name: {
    type: String,
    required: true
  },
  //code se va a tener que generar automaticamente
  creationDate: { 
    type: Date,
    required: true,
    default: Date.now
  },
  //al momento de creacion utilizamos la fecha del día actual
  type: {
    type: String,
    //enum: ["desarrollo","Soporte"],
    required: true,
  },
  state: {
    type: String,
    //enum: ["iniciado","no iniciado","cancelado","finalizado"],
    required: true,
  },
  client: { 
    type: Number,
    required: true
  },
  risk: { 
    type: Number,
    required: true,
    default: 0
  },
  productId: { 
    type: Number,
    required: true
  },
  fase: {
    type: Number,
    required: true,
    default: 1
  },
  iteration: { 
    type: Number,
    required: true,
    default: 1
    },
  description: { 
    type: String,
    required: true,
    default: ""
  },
  resources: { 
    type: Array,
    required: true,
    default: []
  },
  tasks: { 
    type: Array,
    required: true,
    default: []
  },

});

module.exports = mongoose.model("project", projectSchema);
