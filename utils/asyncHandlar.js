

const asyncHandlar = (cb) => {
    return async(req, res, next) => {
        try{
            await cb(req,res,next)
            next()
        }catch(err){
            next(err)
        }
    }
}

module.exports = {asyncHandlar}