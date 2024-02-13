const User = require('../../../../model/nupayment/User')
const bcrypt = require('bcrypt')

const registerUser = async(req,res,next)=>{
const {email,role,password} = req.body



try {

    const hashedPassword = await bcrypt.hash(password,10)
    
    const newUser = new User({
        email:email,password:hashedPassword,role:role
    })

const savedUser = await newUser.save()

res.status(200).json({message:'success user created', userId:savedUser._id })




} catch (error) {
    next(error)
}


}

module.exports = registerUser