const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean, 
        default:0,
    },
    isVerified: {
        type: Number,
        default:0, 
    },
    role: {
        type: Number,
        default:2 
    },
    verifyLink:{
        type:String,
        default:null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
