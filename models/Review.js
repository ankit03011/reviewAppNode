const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  subject: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
