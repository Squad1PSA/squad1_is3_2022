'use strict'

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
  //autoIncrement = require('mongoose-auto-increment');

//var connection = mongoose.createConnection("mongodb://localhost/PSAProject");
//autoIncrement.initialize(connection);

var projectSchema = new Schema({
  /*code: { 
    type: Number,
    required: true,
  },*/
  name: {
    type: String,
    required: true
  },
  //code se va a tener que generar automaticamente
  creationDate: { 
    type: String,
    required: true,
    //se debe pedir la creation date
  },
  startDate: { 
    type: String,
    required: true,
    //se debe pedir la creation date
  },
  endDate: { 
    type: String,
    required: true,
    //se debe pedir la fecha de finalizacion del proyecto
  },
  updatedDate: { 
    type: String,
    required: true,
    //se debe pedir la creation date
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
    default: "No iniciado"
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
    default: " "
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

/*projectSchema.plugin(autoIncrement.plugin, { //nuevo
  model: 'project', 
  field: 'code',
  startAt: 200,
  incrementBy:1
});*/

module.exports = mongoose.model("project", projectSchema);
