const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    birthdate: {
      type: Date,
      required: [true, 'Birthdate is required']
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);