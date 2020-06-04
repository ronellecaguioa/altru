const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
require('./config/passport-setup');
const cors = require('cors');

const donationsRoute = require('./routes/api-routes');
// const authRoute = require('./routes/auth-routes');
const oauthRoute = require('./routes/oauth-routes');

app.use(cors())

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());

// Routes
app.use('/api/donations', donationsRoute);
app.use('/auth', oauthRoute);
// app.use('/auth', authRoute);

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
