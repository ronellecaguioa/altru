const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv/config')

// Import routes
const apiRoute = require('./routes/api-routes');
const authRoute = require('./routes/auth-routes');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_KEY))

// Routes
app.use('/api/donations', apiRoute);
app.use('/auth', authRoute);

// Serve static files only in production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
