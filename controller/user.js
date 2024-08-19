const {asyncHandlar} = require('../utils/asyncHandlar')
const userModal = require('../modal/index')

const userRegistrtion = asyncHandlar(async (req, res) => {
    const result = await userModal.userRegistration(req.body)
    if(result){
        res.status(200).json(result)
    }
})

const userLogin= asyncHandlar(async (req, res) => {
    const result = await userModal.userLogin(req.body)
    if(result){
        res.status(200).json(result)
    }
})


module.exports = {
    userRegistrtion,
    userLogin
}