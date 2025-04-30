const http = require("http");
const express=require("express");
const {connectMongoDb}=require('./connection'); // function from connection file to connect database
require('dotenv').config();
const testuser= require('./models/testusers');
const user=require('./models/users');
const  adminUser=require('./models/adminUsers');
const influencerData=require('./models/influencerData');
const UserRouter= require('./routes/user');
const AdminRouter=require('./routes/adminUser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: true, // Allow only requests from frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));
const { WebSocketServer } = require("ws");

const server = app.listen(5000, () => console.log(`Server running on port 5000`));
const wss = new WebSocketServer({ server });


const port = process.env.PORT || 5000; // Use the PORT environment variable if available
const MONGO_URI = process.env.MONGO_URI; // URI to connect mongodb databse
connectMongoDb(MONGO_URI) ; // calling the function to connect database

//routes
app.use("/users",UserRouter)
app.use("/admin",AdminRouter)


