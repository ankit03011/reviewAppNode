const express = require('express');
const { createCompany, getCompanies, getCompanyById } = require('../controllers/companyController');
const router = express.Router();

router.post('/add', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

module.exports = router;
