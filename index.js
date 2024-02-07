const express = require('express');
require('dotenv').config();
const userRoute = require('./route/user/user')
const mongoose = require('mongoose')

const cors = require('cors')

const app = express();
const getConnection = ()=>{
try {
  mongoose.connect(process.env.MONGO_URL)
 mongoose.connection.once('connected',()=>console.log('db is connected'))
} catch (error) {
}
  

}

getConnection()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.get('/',(req,res,next)=>{
  res.send('server is running')
})
// app.use(getConnection)
//user routes here
app.use('/user',userRoute)


// Define routes and other middleware here...


app.use((error,req,res,next)=>{

    const statusCode = error.statusCode || 500
    const errorMesssage= error.message ||'server error'
    res.status(statusCode).json({message:errorMesssage})
})







const PORT = process.env.PORT || 3000; // Set default port to 3000 if PORT is not specified in environment
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
