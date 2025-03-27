const Users = require('../models/users');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require('dotenv').config();
const SECRET_KEY =process.env.SECRET_KEY

async function handleGetAllusers(req, res) {
    try{
        const allUsers = await Users.find();
        console.log(allUsers)
        res.status(200).json(allUsers)
      }
      catch{
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users.' });
      }
}


async function handleUserSignup(req, res) {
    try {
        // Debugging: Log request body
        console.log(req.body);

        // Destructure request body
        const { firstName, lastName, email, companyName, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase();
      
        console.log(normalizedEmail)

           // Check if the email already exists in the database
           const existingUser = await Users.findOne({email});
           console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create user
        const newUser = await Users.create({
            firstName,
            lastName,
            email: normalizedEmail,
            companyName,
            password
        });

        // Return the created user
        return res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        console.error("Error in handleUserSignup:", error);

        // Check for unique constraint violation
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const authUser = await Users.findOne({ email, password });

        if (!authUser) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log(authUser);

        const token = jwt.sign(
            { userId: authUser._id, email: authUser.email, firstName: authUser.firstName, lastName: authUser.lastName }, // You can add more fields if necessary
            SECRET_KEY,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        

        // Send a success response (you might want to generate a JWT token here)
        res.status(200).json({ message: "Login successful",token, user: { email: authUser.email, userId: authUser._id }  });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


async function getSpecificUser(req,res){
    try {
        const user = req.user;
        console.log(user)
        if (!user) return res.status(404).json({ message: "User not found" });
    
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
}


module.exports={handleGetAllusers,handleUserSignup, handleUserLogin,getSpecificUser};