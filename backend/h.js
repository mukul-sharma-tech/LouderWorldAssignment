const puppeteer = require('puppeteer');

async function scrapeAllImages() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://whatson.cityofsydney.nsw.gov.au', { waitUntil: 'networkidle2' });

  // Wait for 3 seconds inside the page context (manual wait)
  await page.evaluate(() => 
    new Promise(resolve => setTimeout(resolve, 3000))
  );

  const allImageUrls = await page.evaluate(() => {
    const bgImages = [...document.querySelectorAll('*')]
      .map(el => window.getComputedStyle(el).backgroundImage)
      .filter(bg => bg && bg !== 'none')
      .map(bg => {
        const match = bg.match(/url\(["']?(.*?)["']?\)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    const imgSrcs = [...document.querySelectorAll('img')]
      .map(img => img.src)
      .filter(Boolean);

    return Array.from(new Set([...bgImages, ...imgSrcs]));
  });

  await browser.close();
  return allImageUrls;
}

scrapeAllImages()
  .then(urls => {
    console.log('Images found:', urls.length);
    console.log(urls);
  })
  .catch(err => {
    console.error('Error scraping images:', err);
  });
