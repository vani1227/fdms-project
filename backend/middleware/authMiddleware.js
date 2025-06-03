const jwt = require("jsonwebtoken");
//const Faculty = require("../models/Faculty");

exports.verifyHOD = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hod = await Faculty.findById(decoded.id);

    if (!hod || hod.role !== "hod") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    req.user = hod;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


/*function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  }  */


const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied. No token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user data in req.user
    next(); // Allow access to the next middleware/route
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { isAdmin };

module.exports = authMiddleware;

