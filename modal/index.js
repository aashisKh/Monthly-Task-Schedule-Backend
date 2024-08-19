

const {
    userRegistration,
    userLogin,
    checkUsernameExists,
    checkEmailExists,
    getPasswordFromUsername,
} = require('./User')

const {
    getTask,
    addTask,
    updateTask,
    getTaskById
} = require('./Task')


module.exports = {
    userRegistration,
    userLogin,
    checkUsernameExists,
    checkEmailExists,
    getPasswordFromUsername,
    getTask,
    addTask,
    updateTask,
    getTaskById
}