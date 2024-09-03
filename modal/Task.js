


const { executeTransaction } = require("../database/DbConnection");
const {getConnection} = require('../database/DbConnection')

const getTask = async (taskObject) => {
    let  tasks = []
    let query,result
    const {userId, date} = taskObject
    await executeTransaction(async(connection) => {
        try{            
            query = `SELECT 
                        taskid, 
                        taskname, 
                        time, 
                        am_pm, 
                        task_status
                    FROM Task 
                    WHERE userid=? AND date=?
                    `
            result = await connection.query(query,[userId,date])
            tasks = result[0].reverse()
        }catch(error){
            console.log(error.sqlMessage)
        }
    })
    return {
        status:true,
        message: "Task found successfully!!!",
        tasks
    }
}

const getTaskById = async (taskId) => {
    let  tasks = []
    let query,result
    await executeTransaction(async(connection) => {
        try{            
            query = `SELECT 
                        taskid, 
                        taskname, 
                        time, 
                        am_pm, 
                        task_status
                    FROM Task 
                    WHERE taskid=?
                    `
            result = await connection.query(query,[taskId])
            tasks = result[0]
        }catch(error){
            console.log(error.sqlMessage)
        }
    })
    return {
        status:true,
        message: "Task found successfully!!!",
        tasks
    }
}

const addTask = async (newTask) => {
    const {taskname,time,am_pm,date,task_status,userId} = newTask
    let query,result,saved
    await executeTransaction( async (connection) => {
        try{
            query = `
                    INSERT INTO Task (userid, date, taskname, time, am_pm, task_status)
                    VALUES (?,?,?,?,?,?)
                    `
            result = await connection.query(query,[userId,date,taskname,time,am_pm,task_status])
            if(result[0].serverStatus == 3){
                saved = true
            } 
        }catch(error){
            saved = false
            console.log(error.sqlMessage)
        }
    })

    if(saved){
        return {
            status: true,
            message: "Task added successfully !!!"
        }
    }
    return {
        status: false,
        message: "Task cannot be added !!!"
    }
}

const updateTask = async (taskToUpdate) => {
    const { taskname,time,am_pm,task_status,taskid } = taskToUpdate
    let updated = false
    let result,query
    await executeTransaction( async (connection) => {
        try{
            query = `
                    UPDATE Task
                    SET 
	                    taskname = ?,
                        time = ?,
                        am_pm = ?,
                        task_status = ?
                    WHERE taskid = ?  
                    `
            result = await connection.query(query, [taskname,time,am_pm,task_status,taskid])
            if(result[0].serverStatus == 3){
                updated = true
            }
        }catch(error){
            console.log(error.sqlMessage)
            updated = false
        }
    })

    if(updated){
        return {
            status: true,
            message: "Task is updated Successfully !!!"
        }
    }
    return {
        status: false,
        message: "Task cannot be updated !!!"
    }
}

const getTimelyTask = async(time,date, id) => {
    const conn = await getConnection()
    const [hour,minute,amPm] = time.split("-")
    const times = `${hour}:${minute}`
    let query,result

    try{
        query = `
        SELECT 
            taskname,
            time,am_pm
        FROM task
        WHERE 
            date = ? AND 
            time = ? AND 
            am_pm = ? AND 
            task_status = 'new'
            AND userid = ?
        `
        result = await conn.query(query,[date,times,amPm,id])
        result = result[0]
    }catch(error){
        console.log(error)
    }

    return {
        status: true,
        message: 'Timely Task Detected',
        data: result
    }
}

module.exports = {
    getTask,
    addTask,
    updateTask,
    getTaskById,
    getTimelyTask
}

