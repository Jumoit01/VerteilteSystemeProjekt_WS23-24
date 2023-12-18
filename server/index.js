const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4321;

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello MERN App!'));

// Connect to MongoDB (you need to have MongoDB installed)
mongoose.connect('mongodb://mongo:27018/', { useNewUrlParser: true, useUnifiedTopology: true });

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
