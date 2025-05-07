const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const paymentRoutes = require('./routes/payment.routes');

// ✅ CORS Configuration
const corsOptions = {
  origin: 'https://uber-clone-1-4vn5.onrender.com', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other methods you need
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
  credentials: true, // If you need to send cookies or authentication info
};

connectToDb();

// ✅ Apply CORS with options
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);
app.use('/payment', paymentRoutes);

module.exports = app;
