const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: "Access Denied: Missing or malformed Authorization header." 
    });
  }

  const token = authHeader.split(' ')[1];
  const serverSecret = process.env.API_SECRET_TOKEN;

  if (token !== serverSecret) {
    return res.status(403).json({ 
      success: false, 
      message: "Access Denied: Invalid authentication token." 
    });
  }

  next();
}

module.exports = authenticateToken;
