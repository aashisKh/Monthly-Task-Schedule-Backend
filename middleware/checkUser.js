
const userModal = require('../modal/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/generateToken')

const checkUserExists = async (req,res,next) => {
    const {username,email} = req.body
    let result = await userModal.checkUsernameExists(username)
    if(result.exists){
        return res.status(400).json({
            exist: true,
            message: 'Username already Exists'
        })
    }
    result = await userModal.checkEmailExists(email)
    if(result){
        return res.status(400).json({
            exist: true,
            message: 'Email already Exists'
        })
    } 
    next()
}

const loginAuthenticatin = async (req,res,next) => {
    const {username,password} = req.body
    const checkUsername = await userModal.checkUsernameExists(username)
    const {exists,...rest} = checkUsername

    if(!checkUsername){
        return res.status(401).json({
            status: false,
            message: 'Username dosenot exists !!!'
        })
    }

    const hashPassword = await userModal.getPasswordFromUsername(username)
    const isPasswordCorrect = await bcrypt.compare(password,hashPassword)

    if(checkUsername && isPasswordCorrect){
        req.user = checkUsername
        const token = await generateToken(rest,{expiresIn:'1h'})
        return res.status(200).json({
            status: true,
            message: 'Log in successful !!!',
            token
        })
    }
    return res.status(401).json({
        status: false,
        message: 'Password is incorrect !!!'
    })
}

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"
  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({
            status: false,
            message: "Unauthorized"
          }); // Unauthorized 
        }
        console.log(user)
        req.user = user; // Store the user info in the request object
        next();
      });
    } else {
        return res.status(403).json({
            status: false,
            message: "Forbidden"
          }); // Forbidden
    }
  };
  

module.exports = {
    checkUserExists,
    loginAuthenticatin,
    authenticateJWT
}