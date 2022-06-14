const express = require('express')
const router = express.Router()
const Project = require('../models/PSAProject.js')
const Task = require('../models/PSAtasks.js')

// Getting all
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async(req,res)=>{
  //console.log(JSON.stringify(req))
    const project = new Project(req.body)
    try {
        const newProject = await project.save()
        res.status(201).json(newProject)

    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//GET one
router.get('/:id', getProject, (req, res) => {
  res.json(res.project)
})

router.post('/:id', async (req, res) => {
    var updateObject = req.body; // {last_name : "smith", age: 44}
    var id = req.params.id;
    try {
        const updatedProject = await Project.updateOne({_id  : req.params.id}, {$set: updateObject});
        res.json(updatedProject);
    } catch (err) {
        res.send({message: err});
    }
});

//DELETE one
router.delete('/:id', getProject, async (req, res) => {
  try {
    await await Project.remove({_id  : req.params.id});
    res.json({ message: 'project Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProject(req, res, next) {
  let project
  try {
    project = await Project.findById({ _id: req.params.id})
    if (project == null) {
      return res.status(404).json({ message: 'Cannot find project' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.project = project
  next()
}

module.exports = router