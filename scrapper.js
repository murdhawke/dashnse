// scraper.js
const puppeteer = require('puppeteer');
const Stock = require('./models/stock');

async function scrapeStockData() {
  const url = 'https://africanfinancials.com/nairobi-securities-exchange-kenya-share-prices/';
  
  let browser;
  
  try {
    // Launch a headless browser
    browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome' }); // Specify the path to Chrome here
    const page = await browser.newPage();
    
    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Use page.evaluate to execute JavaScript in the context of the page
    const stockData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#af21_prices tbody tr')); // Select rows in tbody
      return rows.map(row => {
        const company = row.querySelector('td:nth-child(1)').innerText.trim(); // Company name
        const price = parseFloat(row.querySelector('td:nth-child(2)').innerText.replace(',', '').trim()); // Price
        const change = row.querySelector('td:nth-child(3)').innerText.trim(); // % Change
        const value = row.querySelector('td:nth-child(4)').innerText.trim(); // Value
        const volume = row.querySelector('td:nth-child(5)').innerText.trim(); // Volume

        return { company, price, change, value, volume }; // Return an object for each row
      }).filter(stock => stock.company && !isNaN(stock.price)); // Filter out invalid entries
    });

    // Log the scraped data to the console
    console.log('Scraped Stock Data:', stockData);

    // Save data to MongoDB
    await Stock.insertMany(stockData);
    console.log('Stock data saved successfully!');

  } catch (error) {
    console.error('Error scraping data:', error);
  } finally {
    // Close the browser
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeStockData;
