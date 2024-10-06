// models/stock.js
const mongoose = require('mongoose');

// Define the Stock schema
const stockSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  change: {
    type: String, // Storing percentage change as a string (e.g., "+0.50%")
    required: true
  },
  value: {
    type: String, // Storing value as a string (can be formatted e.g., "1,000,000")
    required: true
  },
  volume: {
    type: String, // Storing volume as a string (can be formatted e.g., "100,000")
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to the current date
  }
});

// Create a model from the schema
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
