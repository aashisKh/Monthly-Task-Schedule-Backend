

const {
    userRegistrtion,
    userLogin
} = require('./user')


const {
    getTask,
    addTask,
    updateTask,
    getTaskById,
    getTimelyTask
} = require('./task')

module.exports = {
    userRegistrtion,
    userLogin, 
    getTask,
    addTask,
    updateTask,
    getTaskById,
    getTimelyTask   
}