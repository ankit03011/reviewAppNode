const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions));


app.use('/api/companies', companyRoutes);


app.use('/api/companies', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

