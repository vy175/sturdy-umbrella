const User = require('../models/User');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function validateBirthdateRange(birthdateStr) {
  // 1. Check basic string format YYYY-MM-DD
  const formatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!formatRegex.test(birthdateStr)) {
    return { valid: false, reason: "Birthdate must be in YYYY-MM-DD format." };
  }

  // 2. Parse the individual date components
  const parts = birthdateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; 
  const day = parseInt(parts[2], 10);

 
  const dateObj = new Date(year, month, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month ||
    dateObj.getDate() !== day
  ) {
    return { valid: false, reason: "Calendar date is invalid (check your month, or days in that month)." };
  }

  const today = new Date();
  const minimumAcceptableDate = new Date('1900-01-01');

  // 4. Ensure date is not in the future
  if (dateObj > today) {
    return { valid: false, reason: "Birthdate cannot be in the future." };
  }

  // 5. Ensure date is not too early (e.g. before 1900)
  if (dateObj < minimumAcceptableDate) {
    return { valid: false, reason: "Birthdate cannot be earlier than January 1, 1900." };
  }

  return { valid: true };
}


async function validateBulkUpdate(req, res, next) {
  const payload = req.body;

  if (!Array.isArray(payload) || payload.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid payload: Input must be a non-empty array of user records." 
    });
  }

  try {
    for (const record of payload) {
      const { id, username, email, birthdate } = record;

      if (!id || !username || !email || !birthdate) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: Each record must contain id, username, email, and birthdate."
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: `Validation Error: "${email}" is not a valid email address format.`
        });
      }

      const dateValidation = validateBirthdateRange(birthdate);
      if (!dateValidation.valid) {
        return res.status(400).json({
          success: false,
          message: `Validation Error for user "${username}": ${dateValidation.reason}`
        });
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: `Validation Error: User with ID "${id}" does not exist in the system.`
        });
      }
    }

    next();

  } catch (error) {
    console.error("Validation Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Validation failed due to structural payload errors or database connection issues.",
      error: error.message
    });
  }
}

module.exports = { validateBulkUpdate };
