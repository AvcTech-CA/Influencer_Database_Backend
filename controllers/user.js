const Users = require('../models/users');
  

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

        // Check if all required fields are present
        if (!firstName || !lastName || !email || !companyName || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create user
        const newUser = await Users.create({
            firstName,
            lastName,
            email,
            companyName,
            password
        });

        // Return the created user
        return res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        console.error("Error in handleUserSignup:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={handleGetAllusers,handleUserSignup};