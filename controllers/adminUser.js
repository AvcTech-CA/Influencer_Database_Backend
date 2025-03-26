const Users = require('../models/users');
const AdminUsers=require('../models/adminUsers');

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


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const authUser = await AdminUsers.findOne({ email, password });
        console.log(authUser)

        if (!authUser) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log(authUser);

        // Send a success response (you might want to generate a JWT token here)
        res.status(200).json({ message: "Login successful", user: authUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports={handleGetAllusers, handleUserLogin};
