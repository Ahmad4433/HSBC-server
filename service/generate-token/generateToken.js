require('dotenv').config()
const jwt = require('jsonwebtoken')
const accessKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFREH_TOKEN_KEY;


const generateToken = async(data)=>{

const accessToken =  jwt.sign({userId:data.id,userEmail:data.email},accessKey,{expiresIn:'7d'})
const refreshToken = jwt.sign({userId:data.id,userEmail:data.email},refreshKey,{expiresIn:'7d'})

return {accessToken,refreshToken}

}


module.exports = generateToken