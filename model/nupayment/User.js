const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'individual'
        
    }

},{timestamps:true})

module.exports = mongoose.model('User2',userSchema)