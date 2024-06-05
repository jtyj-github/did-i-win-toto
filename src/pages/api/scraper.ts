import puppeteer from 'puppeteer';

async function scrape(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Perform scraping operations here
    // For example, you can extract data using page.evaluate()

    await browser.close();
}

// Usage example
const url = 'https://example.com';
scrape(url);