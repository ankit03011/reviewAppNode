const Review = require('../models/Review');
const Company = require('../models/Company');

const createReview = async (req, res) => {
  try {
    const { fullName, subject, reviewText, rating, companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const review = new Review({ fullName, subject, reviewText, rating, company });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getReviewsByCompany = async (req, res) => {
//   try {
//     const reviews = await Review.find({ company: req.params.companyId });
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const getReviewsByCompany = async (req, res) => {
  try {
    const reviews = await Review.find({ company: req.params.companyId });
    
    // Check if there are reviews
    if (reviews.length === 0) {
      return res.status(200).json({ reviews: [], averageRating: 0 });
    }


    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    res.status(200).json({ reviews, averageRating });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { createReview, getReviewsByCompany };
