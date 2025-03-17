const http = require("http");
const express=require("express");
const {connectMongoDb}=require('./connection'); // function from connection file to connect database
require('dotenv').config();
const testuser= require('./models/testusers');
const UserRouter= require('./routes/user');

const app=express();
const port = process.env.PORT || 5000; // Use the PORT environment variable if available
const MONGO_URI = process.env.MONGO_URI; // URI to connect mongodb databse
connectMongoDb(MONGO_URI) ; // calling the function to connect database

//routes
app.use("/users",UserRouter)



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  