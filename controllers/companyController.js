const Company = require('../models/Company');

const createCompany = async (req, res) => {
  try {
    const { name, location, foundedOn, city } = req.body;
    const company = new Company({ name, location, foundedOn, city });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companiesWithAvgRatingAndCount = await Company.aggregate([
      {
        $lookup: {
          from: 'reviews', 
          localField: '_id', 
          foreignField: 'company',
          as: 'reviews', 
        },
      },
      {
        $project: {
          name: 1,
          location: 1,
          foundedOn: 1,
          city: 1,
          averageRating: {
            $avg: '$reviews.rating', 
          },
          totalReviews: {
            $size: '$reviews',
          },
        },
      },
      {
        $addFields: {
          averageRating: {
            $ifNull: ['$averageRating', 0], 
          },
          totalReviews: {
            $ifNull: ['$totalReviews', 0], 
          },
        },
      },
    ]);

    res.status(200).json(companiesWithAvgRatingAndCount); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCompany, getCompanies, getCompanyById };
