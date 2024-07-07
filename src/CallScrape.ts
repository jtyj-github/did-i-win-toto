import dotenv from "dotenv"; 
import puppeteer, {Browser} from "puppeteer";
import {TotoResult} from "@prisma/client";
import { getJSON } from "./common/utils/processFetchedData";
import { writeStores } from "./common/utils/readWriteStores";

