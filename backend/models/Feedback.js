const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  toolsServices: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  category: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed'],
    default: 'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);