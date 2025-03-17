const Users = require('../models/testusers');


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

module.exports={handleGetAllusers};