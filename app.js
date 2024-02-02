const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./route/user/user')
const cors = require('cors')

const app = express();

// Connect to MongoDB Atlas

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

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
