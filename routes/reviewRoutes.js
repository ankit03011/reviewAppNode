const express = require('express');
const { createReview, getReviewsByCompany } = require('../controllers/reviewController');
const router = express.Router();

router.post('/:companyId/reviews', createReview);

router.get('/:companyId/reviews', getReviewsByCompany);

module.exports = router;

