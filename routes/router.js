
const express = require('express')
const router = express.Router()
const {
    validateUserRegistration,
    validateUserLogin,
    validateTaskDate,
    validateTaskDetail,
    validateUpdateTask,
    validateTaskId
} = require('../validation/validator')
const controller = require('../controller/index')
const {
    checkUserExists,
    loginAuthenticatin,
    authenticateJWT,
    authenticate
} = require('../middleware/checkUser')

router.post(
    '/user/register',
    validateUserRegistration,
    checkUserExists,
    controller.userRegistrtion,
)

router.post(
    '/user/login',
    validateUserLogin,
    loginAuthenticatin,
    controller.userRegistrtion,
)

router.get(
    '/task/gettask',
    authenticateJWT,
    validateTaskDate,
    controller.getTask
)

router.get(
    '/task/gettaskbyid',
    authenticateJWT,
    validateTaskId,
    controller.getTaskById
)

router.post(
    '/task/addtask',
    authenticateJWT,
    validateTaskDetail,
    controller.addTask
)

router.post(
    '/task/updatetask',
    authenticateJWT,
    validateUpdateTask,
    controller.updateTask
)

router.get(
    '/authenticate',
    authenticate,
)

router.get(
    '/task/gettimelytask',
    authenticateJWT,
    controller.getTimelyTask
)

module.exports = router