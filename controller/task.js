
const Task = require('../modal/index')
const {asyncHandlar} = require('../utils/asyncHandlar')

const getTask = asyncHandlar(async (req, res) => {
    const userId = req.user.userid
    const date = req.query.date

    const result = await Task.getTask({userId,date})
    if(result){
        res.status(200).json(result)
    }
})

const getTaskById = asyncHandlar(async (req, res) => {
    const taskId = req.query.taskId
    const result = await Task.getTaskById(taskId)
    if(result){
        res.status(200).json(result)
    }
})

const addTask = asyncHandlar(async (req, res) => {
    const userId = req.user.userid
    const {taskname,time,am_pm,date,task_status} = req.body
    const taskObject = {taskname,time,am_pm,date,task_status,userId}

    const result = await Task.addTask(taskObject)
    if(result){
        res.status(200).json(result)
    }
})

const updateTask = asyncHandlar(async (req, res) => {
    const {taskname,time,am_pm,date,task_status,taskid} = req.body
    const updateTaskObject = {taskname,time,am_pm,date,task_status,taskid}

    const result = await Task.updateTask(updateTaskObject)
    if(result){
        res.status(200).json(result)
    }
})



module.exports = {
    getTask,
    addTask,
    updateTask,
    getTaskById
}