
const mongoose = require('mongoose')
const getConnection = async(req,res,next)=>{


  try {
    
    await mongoose.connect(process.env.MONGO_URL,)
        
    next()
  } catch (error) {
    if(error){
        const error = new Error('we are facing some issue to connecting to database please try again')
        error.statusCode = 400
        next(error)
    }
  }
    

}

module.exports = getConnection