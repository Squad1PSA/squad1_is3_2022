const express = require('express')
const router = express.Router()
const Task = require('../models/PSAtasks.js')

// Getting all
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async(req,res)=>{
  //console.log(JSON.stringify(req))
    const task = new Task(req.body)
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)

    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//GET one

router.get('/:id', getTask, (req, res) => {
  res.json(res.task)
})


router.patch('/:id', async (req, res) => {
    var updateObject = req.body; // {last_name : "smith", age: 44}
    var id = req.params.id;
    try {
        const updatedTask = await Task.updateOne({_id  : req.params.id}, {$set: updateObject});
        res.json(updatedTask);
    } catch (err) {
        res.send({message: err});
    }
});

//DELETE one

router.delete('/:id', getTask, async (req, res) => {
  try {
    await await Task.remove({_id  : req.params.id});
    res.json({ message: 'task Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTask(req, res, next) {
  let task
  try {
    task = await Task.findById({ _id: req.params.id})
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
}

module.exports = router