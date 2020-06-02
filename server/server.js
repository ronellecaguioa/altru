const express = require('express');
const path = require('path')
const app = express();


// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Test route
app.get('/api', (req, res) => {
  res.json({
    message: 'hitting the server!!!!!!!!'
  })
})

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.resolve(__dirname, '../dist')))
  
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
