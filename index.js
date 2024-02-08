const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoute = require('./route/user/user');
const mongoose = require('mongoose');

const app = express();

const getConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.once('connected', () => console.log('db is connected'));
  } catch (error) {
    console.log(error);
  }
};

getConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Use cors middleware to handle CORS
// app.use(cors({
//   origin: '*', // Allow requests from any origin, you can restrict it to specific origins if needed
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow the specified HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow the specified headers
// }));

app.get('/', (req, res, next) => {
  res.send('server is running');
});

// User routes here
app.use('/user', userRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || 'Server error';
  res.status(statusCode).json({ message: errorMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
