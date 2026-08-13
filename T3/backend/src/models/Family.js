const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }],
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Family', familySchema);
