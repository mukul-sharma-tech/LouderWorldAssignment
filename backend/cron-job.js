require('dotenv').config();
const mongoose = require('mongoose');
const cron = require('node-cron');
const scrapeEvents = require('./scrape');

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Schedule job to run every day at 8:00 AM server time
    cron.schedule('0 8 * * *', () => {
      console.log('⏰ Running scheduled event scrape...');
      scrapeEvents();
    });

    console.log('⏳ Cron job scheduled: daily at 8:00 AM');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

start();
