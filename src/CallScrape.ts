import dotenv from "dotenv"; 
import puppeteer, {Browser} from "puppeteer";
import {TotoResult, TotoWinningPool} from "@prisma/client";
import { getJSON } from "./common/utils/processFetchedData";
import { writeStores } from "./common/utils/readWriteStores";
import { error } from "console";

dotenv.config();
const {NODE_ENV, SERVER_URL} = process.env;

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const notificationList = [];

async function writeServerFile<T>(fileName: string): Promise<void> {
    const url = `${SERVER_URL}/${fileName}`;
    console.log(`Fetching ${fileName}.json from ${url}`);
    const list = await getJSON<T>(url).catch((error) => {
        return {};
    });
}