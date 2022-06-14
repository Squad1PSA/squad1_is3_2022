const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

var router = express.Router();
//comment

app.use(router);

mongoose.connect('mongodb+srv://projectsPSA:projectspsa@clusterpsa.yp2pamo.mongodb.net/projectsPSA?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json())
app.use((req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET, OPTIONS')
    next()
})
const projectsRouter = require('./routes/projectsRoutes')
const tasksRouter = require('./routes/tasksRoutes')
app.use('/projects', projectsRouter)
app.use('/tasks',tasksRouter)

app.listen(2000, () => console.log('Node server running'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))


