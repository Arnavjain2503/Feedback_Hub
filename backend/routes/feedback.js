const express = require('express');
const router = express.Router();

const Feedback = require('../models/Feedback');
const User = require('../models/User');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, async (req, res) => {
  const {
    customId,
    name,
    email,
    subject,
    toolsServices,
    content,
    rating,
    category
  } = req.body;

  try {
    // Enforce role‑based access: only User and admins can submit
    // feedback. Any other role is denied.
    const userRole = req.user.role;
    if (userRole !== 'feedback_giver' && userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: you are not allowed to submit feedback' });
    }

    // Validate required fields
    if (!customId || customId.trim().length === 0) {
      return res.status(400).json({ message: 'Feedback id is required' });
    }
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!email || email.trim().length === 0) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Feedback content is required' });
    }

    const numericRating = rating ? Number(rating) : undefined;
    const feedback = new Feedback({
      customId,
      name,
      email,
      subject,
      toolsServices,
      content,
      rating: numericRating,
      category,
      user: req.user.id
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    console.error(err);
    // Handle unique constraint violations for customId
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Feedback id already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, role('admin'), async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'email role');
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, role('admin'), async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user', 'email role');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id', auth, role('admin'), async (req, res) => {
  const { status } = req.body;
  try {
    if (!['new', 'reviewed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, role('admin'), async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;