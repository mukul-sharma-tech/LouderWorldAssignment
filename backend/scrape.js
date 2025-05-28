// const axios = require('axios');
// const cheerio = require('cheerio');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const Event = require('./models/Event'); // Create a separate file if preferred or inline schema

// async function scrapeEvents() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
//     const $ = cheerio.load(data);

//     const events = [];
//     $('.card--content').each((i, el) => {
//       const title = $(el).find('.card__title').text().trim();
//       const date = $(el).find('.card__date').text().trim();
//       const link = 'https://whatson.cityofsydney.nsw.gov.au' + $(el).find('a').attr('href');
//       if(title && date && link) {
//         events.push({ title, date, link });
//       }
//     });

//     // Clear old events and insert fresh
//     await Event.deleteMany({});
//     await Event.insertMany(events);

//     console.log(`Scraped and saved ${events.length} events.`);
//     process.exit(0);
//   } catch (error) {
//     console.error('Scrape error:', error);
//     process.exit(1);
//   }
// }

// scrapeEvents();













// const axios = require('axios');
// const cheerio = require('cheerio');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const Event = require('./models/Event'); // Your Mongoose model

// async function scrapeEvents() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
//     const $ = cheerio.load(data);

//     const events = [];

//     $('.event_tile-link').each((i, el) => {
//       const title = $(el).attr('title')?.trim() || $(el).text().trim();
//       const link = 'https://whatson.cityofsydney.nsw.gov.au' + $(el).attr('href');
//       if (title && link) {
//         events.push({ title, link });
//       }
//     });

//     console.log(`🔍 Found ${events.length} events. Fetching individual dates...`);

//     // Fetch date from individual event pages
//     for (let event of events) {
//       try {
//         const { data: eventPage } = await axios.get(event.link);
//         const $event = cheerio.load(eventPage);
//         const date = $event('.event-detail__date-time').first().text().trim();
//         event.date = date || 'Date not found';
//       } catch (err) {
//         console.warn(`⚠️ Failed to fetch date for: ${event.title}`);
//         event.date = 'Date not found';
//       }
//     }

//     // Clear old events and insert fresh ones
//     await Event.deleteMany({});
//     await Event.insertMany(events);

//     console.log(`✅ Scraped and saved ${events.length} events.`);
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Scrape error:', error);
//     process.exit(1);
//   }
// }

// scrapeEvents();






const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./models/Event');

async function scrapeEvents() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
    const $ = cheerio.load(data);

    const events = [];

    $('.event_tile').each((i, el) => {
      const title = $(el).find('.event_tile-link').attr('title')?.trim() || 'No title';
      const relativeLink = $(el).find('.event_tile-link').attr('href');
      const link = relativeLink ? 'https://whatson.cityofsydney.nsw.gov.au' + relativeLink : null;
      const date = $(el).find('.event_tile-footer').text().trim() || 'Date not found';
      const location = $(el).find('.event_card_location-content span').text().trim() || 'Location not found';

      if (title && link && date) {
        events.push({ title, link, date, location });
      }
    });

    // Save to DB
    await Event.deleteMany({});
    await Event.insertMany(events);

    console.log(`✅ Scraped and saved ${events.length} events.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Scrape error:', error);
    process.exit(1);
  }
}

scrapeEvents();
