const jwt = require('jsonwebtoken')
require('dotenv').config()


const isAuth  = async(req,res,next)=>{

try {
    
const header = req.get('Authorization')
if(!header){
    const error = new Error('headers missing')
    error.statusCode = 401
    throw error
}

const token = header.split(' ')[1]

jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{


    if(err){
        const error = new Error('unAuthorized')
        error.statusCode = 401
        throw error
    }else{
        req.role = decoded.userRole
        req.email = decoded.userEmail

    }
})
next()
} catch (error) {
    
    next(error)
}


}

module.exports = isAuth