const http = require("http");
const express=require("express");
require('dotenv').config();


const app=express();
const port = process.env.PORT || 5000; // Use the PORT environment variable if available


app.get("/", (req,res) => {
    return res.send("Hello AVC")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  