// const axios = require('axios');
// const cheerio = require('cheerio');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const Event = require('./models/Event');

// // async function scrapeEvents() {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI);
// //     console.log('✅ Connected to MongoDB');

// //     const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
// //     const $ = cheerio.load(data);

// //     const events = [];

// //     $('.event_tile').each((i, el) => {
// //       const title = $(el).find('.event_tile-link').attr('title')?.trim() || 'No title';
// //       const relativeLink = $(el).find('.event_tile-link').attr('href');
// //       const link = relativeLink ? 'https://whatson.cityofsydney.nsw.gov.au' + relativeLink : null;
// //       const date = $(el).find('.event_tile-footer').text().trim() || 'Date not found';
// //       const location = $(el).find('.event_card_location-content span').text().trim() || 'Location not found';

// //       if (title && link && date) {
// //         events.push({ title, link, date, location });
// //       }
// //     });

// //     // Save to DB
// //     await Event.deleteMany({});
// //     await Event.insertMany(events);

// //     console.log(`✅ Scraped and saved ${events.length} events.`);
// //     process.exit(0);
// //   } catch (error) {
// //     console.error('❌ Scrape error:', error);
// //     process.exit(1);
// //   }
// // }

// async function scrapeEvents() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
//     const $ = cheerio.load(data);

//     const events = [];

//     $('.event_tile').each((i, el) => {
//       const title = $(el).find('.event_tile-link').attr('title')?.trim() || 'No title';
//       const relativeLink = $(el).find('.event_tile-link').attr('href');
//       const link = relativeLink ? 'https://whatson.cityofsydney.nsw.gov.au' + relativeLink : null;
//       const date = $(el).find('.event_tile-footer').text().trim() || 'Date not found';
//       const location = $(el).find('.event_card_location-content span').text().trim() || 'Location not found';

//       // ✅ Extract image URL from inline style
//       const imageStyle = $(el).find('.image_background-image').attr('style') || '';
//       const imageMatch = imageStyle.match(/url\(["']?(.*?)["']?\)/);
//       const image = imageMatch ? imageMatch[1] : 'Image not found';

//       if (title && link && date) {
//         events.push({ title, link, date, location, image });
//       }
//     });

//     // Save to DB
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




// const axios = require('axios');
// const cheerio = require('cheerio');
// const mongoose = require('mongoose');
// const puppeteer = require('puppeteer');
// require('dotenv').config();

// const Event = require('./models/Event');

// async function scrapeWithPuppeteer() {
//   const browser = await puppeteer.launch({ 
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox']
//   });
//   const page = await browser.newPage();

//   await page.goto('https://whatson.cityofsydney.nsw.gov.au', { 
//     waitUntil: 'networkidle2',
//     timeout: 30000
//   });

//   // Wait for the event tiles to load
//   await page.waitForSelector('.event_tile', { timeout: 10000 });

//   const imageData = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll('.event_tile')).map(tile => {
//       const title = tile.querySelector('.event_tile-link')?.title?.trim() || 'No title';
      
//       // Try multiple ways to get the image URL
//       const bgElement = tile.querySelector('.image_background-image');
//       let imageUrl = '';
      
//       if (bgElement) {
//         // Try computed style first
//         const computedStyle = window.getComputedStyle(bgElement);
//         const bgImage = computedStyle.backgroundImage;
//         const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
//         imageUrl = match ? match[1] : '';
        
//         // If that fails, try inline style
//         if (!imageUrl && bgElement.style) {
//           const inlineMatch = bgElement.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
//           imageUrl = inlineMatch ? inlineMatch[1] : '';
//         }
//       }

//       return { title, imageUrl };
//     }).filter(item => item.imageUrl);
//   });

//   await browser.close();
//   return imageData;
// }

// async function scrapeEvents() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     // Get event data with Cheerio
//     const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
//     const $ = cheerio.load(data);

//     // Get image data with Puppeteer
//     const imageData = await scrapeWithPuppeteer();
//     console.log('✅ Fetched image data:', imageData.length, 'images found');
//     console.log('Sample image data:', imageData.slice(0, 3));

//     const events = [];

//     $('.event_tile').each((i, el) => {
//       const title = $(el).find('.event_tile-link').attr('title')?.trim() || 'No title';
//       const relativeLink = $(el).find('.event_tile-link').attr('href');
//       const link = relativeLink ? 'https://whatson.cityofsydney.nsw.gov.au' + relativeLink : null;
//       const date = $(el).find('.event_tile-footer').text().trim() || 'Date not found';
//       const location = $(el).find('.event_card_location-content span').text().trim() || 'Location not found';

//       // Find matching image URL from Puppeteer data
//       const matchingImage = imageData.find(img => 
//         img.title.toLowerCase() === title.toLowerCase()
//       );
//       const image = matchingImage ? matchingImage.imageUrl : 'Image not found';

//       if (title && link && date) {
//         events.push({ title, link, date, location, image });
//       }
//     });

//     // Save to DB
//     await Event.deleteMany({});
//     await Event.insertMany(events);

//     console.log(`✅ Scraped and saved ${events.length} events.`);
//     console.log('Sample events:', events.slice(0, 3));
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
const puppeteer = require('puppeteer');
require('dotenv').config();

const Event = require('./models/Event');

async function scrapeAllImages() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://whatson.cityofsydney.nsw.gov.au', { waitUntil: 'networkidle2' });

  // Wait for 3 seconds inside the page context (manual wait)
  await page.evaluate(() => 
    new Promise(resolve => setTimeout(resolve, 3000))
  );

  const allImageUrls = await page.evaluate(() => {
    const bgImages = [...document.querySelectorAll('.event_tile')] // Focus only on event tiles
      .flatMap(tile => {
        const elements = [...tile.querySelectorAll('*')];
        return elements.map(el => window.getComputedStyle(el).backgroundImage);
      })
      .filter(bg => bg && bg !== 'none')
      .map(bg => {
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    const imgSrcs = [...document.querySelectorAll('.event_tile img')]
      .map(img => img.src)
      .filter(Boolean);

    return Array.from(new Set([...bgImages, ...imgSrcs]));
  });

  await browser.close();
  return allImageUrls;
}

async function scrapeEvents() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get event data with Cheerio
    const { data } = await axios.get('https://whatson.cityofsydney.nsw.gov.au');
    const $ = cheerio.load(data);

    // Get all image URLs with Puppeteer
    const imageUrls = await scrapeAllImages();
    console.log(`✅ Found ${imageUrls.length} image URLs`);

    const events = [];
    const usedImageUrls = new Set();

    $('.event_tile').each((i, el) => {
      const title = $(el).find('.event_tile-link').attr('title')?.trim() || `Event ${i+1}`;
      const relativeLink = $(el).find('.event_tile-link').attr('href');
      const link = relativeLink ? 'https://whatson.cityofsydney.nsw.gov.au' + relativeLink : null;
      const date = $(el).find('.event_tile-footer').text().trim() || 'Date not found';
      const location = $(el).find('.event_card_location-content span').text().trim() || 'Location not found';

      // Extract the event name from title for matching
      const eventNameSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      // Find the best matching image
      let image = 'Image not found';
      
      // First try to find exact match in URL
      const exactMatch = imageUrls.find(url => 
        !usedImageUrls.has(url) && 
        url.toLowerCase().includes(eventNameSlug)
      );
      
      if (exactMatch) {
        image = exactMatch;
        usedImageUrls.add(exactMatch);
      } 
      // Then try partial match
      else if (eventNameSlug.length > 3) {
        const partialMatch = imageUrls.find(url => 
          !usedImageUrls.has(url) && 
          eventNameSlug.split('-').some(part => 
            part.length > 3 && url.toLowerCase().includes(part)
          )
        );
        
        if (partialMatch) {
          image = partialMatch;
          usedImageUrls.add(partialMatch);
        }
      }
      
      // Fallback to sequential assignment
      if (image === 'Image not found' && imageUrls[i]) {
        image = imageUrls[i];
        usedImageUrls.add(imageUrls[i]);
      }

      if (title && link && date) {
        events.push({ title, link, date, location, image });
      }
    });

    // Save to DB
    await Event.deleteMany({});
    await Event.insertMany(events);

    console.log(`✅ Scraped and saved ${events.length} events.`);
    console.log('Sample events:', events.slice(0, 3));
    process.exit(0);
  } catch (error) {
    console.error('❌ Scrape error:', error);
    process.exit(1);
  }
}

scrapeEvents();