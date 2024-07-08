import dotenv from "dotenv"; 
import puppeteer, {Browser} from "puppeteer";
import {TotoResult, TotoWinningPool} from "@prisma/client";
import { getJSON } from "./common/utils/processFetchedData";
import { writeStores } from "./common/utils/readWriteStores";
import totoScrape from "./pages/api/scraper";
import { write } from "fs";

dotenv.config();
const {NODE_ENV, SERVER_URL} = process.env;

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const notificationList = [];

async function writeServerFile<T>(fileName: string): Promise<void> {
    const url = `${SERVER_URL}/${fileName}`;
    console.log(`Fetching ${fileName}.json from ${url}`);
    const list = await getJSON<T>(url).catch(() => {
        console.error(`Error: ${fileName}.json does not exist on Server.`);
        return {};
    });

    Object.keys(list).length > 0 ? writeStores(fileName, list) : console.warn(`Warning: Skipping file creation.`) 
}

async function processResult(browser: Browser) {
    const fileName = 'sg_lottery.json';
    try {
        isProd || isTest ? await writeServerFile<TotoResult>(`v1/${fileName}`) : null ;
        const data = await totoScrape(browser); 
        notificationList.push(data);

        writeStores<TotoResult>(fileName, data, 'upload');

    } catch (error) {
        console.error(error);
    }
}
