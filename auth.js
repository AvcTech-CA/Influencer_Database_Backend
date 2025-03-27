const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
 
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    req.user = decoded; // Attach user info to request
    console.log(req.user);
    next();
    
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports={authenticateUser}
