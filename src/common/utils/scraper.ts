import { TotoResult } from '@prisma/client';
import { Browser } from 'puppeteer';

import prisma from '@/common/lib/prisma';

export default async function totoScrape(browser: Browser): Promise<TotoResult[]> {
    const page = await browser.newPage();
    const response = await page.goto('http://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx')
        .catch(async (error: Error) => {
            console.error('Problem with scraping Toto results:', error);
        });

    if (!response) {
        return [];
    }

    const results = await page.evaluate(() => {
        const items = [...document.querySelectorAll('.tables-wrap')];
        return items.map(item => {
            const drawNumber = Number(item.querySelector('.drawNumber')?.textContent?.trim().split(' ')[2]);
            const drawDate = item.querySelector('.drawDate')?.textContent;            
            const winningNum = [
                item.querySelector('.win1')?.textContent?.trim() || '',
                item.querySelector('.win2')?.textContent?.trim() || '',
                item.querySelector('.win3')?.textContent?.trim() || '',
                item.querySelector('.win4')?.textContent?.trim() || '',
                item.querySelector('.win5')?.textContent?.trim() || '',
                item.querySelector('.win6')?.textContent?.trim() || '',
            ];
            const additionalNum = item.querySelector('.additional')?.textContent?.trim() || '';

            const winningPool: { group: string; prize: number; winners: number; }[] = [];
            const parseWinningString = /[^\d.]/g;
            const winningPoolNode = item.querySelector('.tableWinningPoolwinningPool');
            const winningShareRows = winningPoolNode ? Array.from(winningPoolNode.querySelectorAll('tr')).slice(2) : [];

            for (const row of winningShareRows) {
                const columns = Array.from(row.querySelectorAll('td'));
                const group = columns[0].textContent?.trim() || '';
                const prize = parseFloat(columns[1].textContent?.trim().replace(parseWinningString, '') || '0');
                const winners = parseInt(columns[2].textContent?.trim().replace(parseWinningString, '') || '0');
                winningPool.push({ group, prize, winners });
            }

            return {
                drawNumber,
                drawDate,
                winningNum,
                additionalNum,
                winningPool,
            };
        });
    }).catch((error: Error) => {
        console.error('Problem with scraping Toto results:', error);
        return [];
    });

    if (results.length === 0) {
        console.error('No Toto results found');
        await page.close();
        return [];
    }

    const savedResults = [];
    for (const result of results) {

        const savedResult = await prisma.totoResult.create({
            data: {
                drawNumber: result.drawNumber,
                drawDate: result.drawDate ?? '',
                winningNum: result.winningNum,
                additionalNum: result.additionalNum,
                winningPool: {
                    create: result.winningPool.map(share => ({
                        group: share.group,
                        prize: share.prize,
                        winners: share.winners,
                    })),
                },
            },
            include: {
                winningPool: true,
            },
            }
        );
        savedResults.push(savedResult);
    }

    await page.close();
    console.log('TOTO - Scraped', results.length, 'results');
    return savedResults;
}

