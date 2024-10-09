const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  foundedOn: Date,
  city: String,
});

module.exports = mongoose.model('Company', companySchema);
