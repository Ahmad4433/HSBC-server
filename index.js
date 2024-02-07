const express = require('express');
require('dotenv').config();
const cors = require('cors')

const userRoute = require('./route/user/user')
const mongoose = require('mongoose')



const app = express();
const options=[
  cors({
    origin:'*',
    methods:'*',
    allowedHeaders:['Content-Type','Authorization']
  })
]



const getConnection = ()=>{
try {
  mongoose.connect(process.env.MONGO_URL)
 mongoose.connection.once('connected',()=>console.log('db is connected'))
} catch (error) {
  console.log(error)
}
  

}

getConnection()




app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Middleware to allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});
app.use(options)

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
