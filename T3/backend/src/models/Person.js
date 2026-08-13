const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  birthYear: {
    type: Number,
    required: [true, 'Birth year is required'],
    validate: {
      validator: function(v) {
        return v <= new Date().getFullYear();
      },
      message: props => `Birth year (${props.value}) cannot be in the future!`
    }
  },
  parentInFamilies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  }],
  childInFamilies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family'
  }]
}, {
  timestamps: true
});

personSchema.index({ birthYear: 1 });

module.exports = mongoose.model('Person', personSchema);
