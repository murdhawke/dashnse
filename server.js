// server.js
const mongoose = require('mongoose');
const cron = require('node-cron');
const scrapeStockData = require('./scrapper.js');

const mongoURI = 'mongodb+srv://cheruiyotca:S87sGFR8pw351Kpc@datax.gvoel.mongodb.net/?retryWrites=true&w=majority&appName=datax'; // Replace with your connection string

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');

  // Schedule the scraper to run every minute
  cron.schedule('* * * * *', () => { // Change this line to run every minute
    console.log('Running stock data scraper...');
    scrapeStockData();
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
