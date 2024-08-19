
const Joi = require('joi')
const joi = require('joi')

const validateUserRegistrationSchema = joi.object({
    username: joi.string().required().messages({'any.required':'Username is required'}),
    email: joi.string().email().required().messages({'any.required':'Email is required'}),
    password: joi.string().min(8).required().messages({'any.required':'Password is required'})
})

const validateUserLoginSchema = joi.object({
    username: joi.string().required().messages({'any.required':'Username is required'}),
    password: joi.string().min(8).required().messages({'any.required':'Password is required'})
})

const validateTaskDateSchema = Joi.object({
    date: Joi.date().required().messages({'any.required':'Date is required'})
})

const validateTaskIdSchema = Joi.object({
    taskId: Joi.string().required().min(1).messages(
        {
            'any.required':'Task Id is required',
            'string.empty': 'Task Id is required',
            'string.min': 'Task Id is required'

        }
    )
})

const validateTaskDetailSchema = Joi.object({
    taskname: Joi.string().required().min(10).messages({'any.required':'Taskname is required'}),
    time: Joi.string().required().messages({'any.required':'Time is required'}),
    am_pm: Joi.string().valid('am','pm').required().default('am').messages({'any.required':'am pm is required'}),
    date: Joi.date().required().messages({'any.required':'Date is required'}),
    task_status: Joi.string().default('new').valid('new','process','done','cancel').required().messages({'any.required':'Task status is required'})
})

const validateUpdateTaskSchema = Joi.object({
    taskname: Joi.string().required().min(10).messages({'any.required':'Taskname is required'}),
    time: Joi.string().required().messages({'any.required':'Time is required'}),
    am_pm: Joi.string().valid('am','pm').required().default('am').messages({'any.required':'am pm is required'}),
    task_status: Joi.string().default('new').valid('new','process','done','cancel').required().messages({'any.required':'Task status is required'}),
    taskid: Joi.number().required().min(1).messages({'any.required':'Task id  is required'})
})



const validateUserRegistration = async (req,res,next) => {
    const {error, value} = validateUserRegistrationSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.message})
    }
    next()
}

const validateUserLogin = async (req,res,next) => {
    console.log(req.body)
    const {error, value} = validateUserLoginSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.message})
    }
    next()
}

const validateTaskDate = async (req, res, next) => {
    const {error, value} = validateTaskDateSchema.validate(req.query)
    if(error){
        return res.json({message: error.message})
    }
    next()
}

const validateTaskId = async (req, res, next) => {
    const {error, value} = validateTaskIdSchema.validate(req.query)
    if(error){
        return res.json({message: error.message})
    }
    next()
}

const validateTaskDetail = async (req, res, next) => {
    const {error, value} = validateTaskDetailSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error.message})
    }
    next()
}

const validateUpdateTask = async (req, res, next) => {
    const {error, value} = validateUpdateTaskSchema.validate(req.body)
    if(error){
        return res.json({message: error.message})
    }
    next()
}

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateTaskDate,
    validateTaskDetail,
    validateUpdateTask,
    validateTaskId
}