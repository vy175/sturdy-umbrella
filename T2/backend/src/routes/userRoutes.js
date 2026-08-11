const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const { validateBulkUpdate } = require('../middleware/validateUser');

router.use(authenticateToken);


router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    let query = {};
    if (name) {
      const searchRegex = new RegExp(name, 'i');

      query = {
        $or: [
          { username: searchRegex },
          { email: searchRegex }
        ]
      };
    }

    const users = await User.find(query);

    const formattedUsers = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      birthdate: user.birthdate
    }));

    return res.status(200).json(formattedUsers);

  } catch (error) {
    console.error("GET Users Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error occurred while retrieving records.",
      error: error.message 
    });
  }
});


router.post('/', validateBulkUpdate, async (req, res) => {
  try {
    const payload = req.body;

    const updatePromises = payload.map(record => {
      return User.findByIdAndUpdate(
        record.id,
        {
          username: record.username.trim(),
          email: record.email.trim().toLowerCase(),
          birthdate: new Date(record.birthdate)
        },
        { new: true, runValidators: true }
      );
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: `Successfully updated ${payload.length} user record(s).`
    });

  } catch (error) {
    console.error("POST Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while executing bulk updates.",
      error: error.message
    });
  }
});

module.exports = router;
