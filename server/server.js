const express = require('express');
const path = require('path');
const app = express();

const donationsRouter = require('./api');
const authRoute = require('./routes/auth-routes');

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/donations', donationsRouter);
app.use('/auth', authRoute);

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
