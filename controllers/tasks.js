const Task = require('../models/task')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch(err) {
        res.status(500).send({err: err}) 
    }
} 

const createTask = async (req, res) => {
    try {
      const task  = await Task.create(req.body)
        res.status(201).json({task})
    } catch(err) {
        res.status(500).send({err: err})
    }
}

const updateTask = async (req, res) => {
    try {
        const {id: taskId} = req.params
        const task  = await Task.findOneAndUpdate({_id : taskId}, req.body, {new: true, runValidators: true})
        if (!task)
        res.status(400).send(`No Task with id ${taskId} found`)
        
        res.status(200).json({ task })
      } catch(err) {
          res.status(500).send({err: err})
      }
}

const getTask = async (req, res) => {
    try {
        const {id: taskId} = req.params
        const task  = await Task.findOne({_id : taskId})
        if (!task)
        res.status(400).send(`No Task with id ${taskId} found`)
        res.status(200).json({ task })
      } catch(err) {
          res.status(500).send({err: err})
      }
}

const deleteTask = async (req, res) => {
    try {
        const {id: taskId} = req.params
        const task  = await Task.findOneAndDelete({_id : taskId})
        if (!task)
        res.status(400).send(`No Task with id ${taskId} found`)
        res.status(200).json({ task })
      } catch(err) {
          res.status(500).send({err: err})
      }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}