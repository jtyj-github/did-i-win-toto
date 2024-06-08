import puppeteer, { Browser } from 'puppeteer';
import prisma from '../../common/lib/prisma';

interface TotoResult {
    drawNumber: number;
    drawDate: number;
    winningNum: number[];
    additionalNum: number;
    winningPool: TotoWinningPool[];
}

interface TotoWinningPool {
    group: string;
    prize: number;
    winners: number;
}

export default async function totoScrape(browser: Browser) {
    const page = await browser.newPage();
    const response = await page.goto('http://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx')
        .catch(async (error: Error) => {
            console.error('Problem with scraping Toto results:', error);
        }
    );

    if (!response) {
        return [];
    }

    const results = await page.evaluate(() => {
        const items = [...document.querySelectorAll('.tables-wrap')];
        return items.map(item => {
            // Toto Draw Information
            const drawNumber = Number(item.querySelectorAll('.drawNumber').textContent.trim().split(' ')[2]);
            const rawDrawDate = item.querySelector('.drawDate').textContent.trim();
            const drawDate = Date.parse(`${rawDrawDate} GMT+0800`);
            const winningNum = [
                Number(item.querySelector('.win1').textContent.trim()),
                Number(item.querySelector('.win2').textContent.trim()),
                Number(item.querySelector('.win3').textContent.trim()),
                Number(item.querySelector('.win4').textContent.trim()),
                Number(item.querySelector('.win5').textContent.trim()),
                Number(item.querySelector('.win6').textContent.trim()),
            ];
            const additionalNum = Number(item.querySelector('.additional').textContent.trim()),

            //Extract Winning Pool info
        });
        
    })
};
