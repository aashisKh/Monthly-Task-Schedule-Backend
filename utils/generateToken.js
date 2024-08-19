
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = async (userDetail,expiresIn) => {
    return jwt.sign(userDetail,process.env.SECRET_KEY,expiresIn)
}






module.exports = {
    generateToken
}