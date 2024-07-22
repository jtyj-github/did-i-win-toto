import dotenv from "dotenv"; 
import puppeteer, {Browser} from "puppeteer";
import { TotoResult } from "@prisma/client";
import { getJSON } from "@/common/utils/processFetchedData";
import { writeStores } from "@/common/utils/readWriteStores";
import totoScrape from "@/common/utils/scraper";

dotenv.config();
const {NODE_ENV, SERVER_URL} = process.env;

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
let notificationList: TotoResult[];

async function writeServerFile<T>(fileName: string): Promise<void> {
    const url = `${SERVER_URL}/${fileName}`;
    console.log(`Fetching ${fileName}.json from ${url}`);
    const list = await getJSON<T>(url).catch(() => {
        console.error(`Error: ${fileName}.json does not exist on Server.`);
        return {} as T;
    }) || {};

    Object.keys(list).length > 0 ? writeStores(fileName, list) : console.warn(`Warning: Skipping file creation.`) 
}

async function processResult(browser: Browser) {
    const fileName = 'sg_lottery.json';
    try {
        if (isProd || isTest) {
            await writeServerFile<TotoResult>(`v1/${fileName}`);
        }
        const data = await totoScrape(browser); 
        notificationList = data;
        writeStores<TotoResult>(fileName, data, 'upload');

    } catch (error) {
        console.error(error);
    }
}

const createTopicsFile = () => {
    const fileName = 'topics.json';
    const scraperTopics = {
        topics: notificationList.map((item) => {
            return {
                title: `Toto Results for Draw ${item.drawNumber}`,
                message: `The winning numbers for Toto Draw ${item.drawNumber} are ${item.winningNum.join(', ')}.`,
                url: `${SERVER_URL}/uploads/v1/sg_lottery.json`
            }
        })};
    writeStores(fileName, [scraperTopics]);
}

const main = async () => {
    console.log(`Current Environment -- ${process.env.NODE_ENV}`);
    const isARMMac = process.arch === 'arm64' && process.platform === 'darwin';

    const browser = await puppeteer.launch({
        headless: isProd || isTest,
        args: isProd || isTest ? ['--no-sandbox'] : [],
        executablePath: isARMMac ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined
    });
    await processResult(browser);
    await browser.close();
    createTopicsFile();
}

export default main;