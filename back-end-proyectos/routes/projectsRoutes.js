const express = require('express')
const router = express.Router()
const Project = require('../models/PSAProject.js')

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
        /*code: req.body.code,
        name: req.body.name,
        type: req.body.type,
        state: req.body.state,
        client: req.body.client,
        product: req.body.product,
        description: req.body.description,
    })*/

    try {
        const newProject = await project.save()
        res.status(201).json(newProject)

    } catch (err) {
        res.status(400).json({message:err.message})
    }
})


//GET one
router.get('/:code', getProject, (req, res) => {
  res.json(res.project)
})

//UPDATE one
router.patch('/:id', getProject, async (req, res) => {
  if (req.body.state != null) {
    res.project.state = req.body.state
  }
  if (req.body.risk != null) {
    res.project.risk = req.body.risk
  }
  if (req.body.fase != null) {
    res.project.fase = req.body.fase
  }
  if (req.body.iteration != null) {
    res.project.iteration = req.body.iteration
  }
  if (req.body.description != null) {
    res.project.description = req.body.description
  }
  if (req.body.resources != null) {
    res.project.resources = req.body.resources
  }
  if (req.body.tasks != null) {
    res.project.tasks = req.body.tasks
  }
  try {
    const updatedProject = await res.project.save()
    res.status(201).json(updatedProject)

  } catch (err) {
    res.status(400).json({message:err.message})
  }
})

//DELETE one
router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove()
    res.json({ message: 'project Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProject(req, res, next) {
  let project
  try {
    project = await Project.find({ code: req.params.code})
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