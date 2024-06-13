import fs from 'fs';
import path from 'path';

const DIR_TEMP = path.join(process.cwd(), 'temp');
const DIR_UPLOAD = path.join(process.cwd(), 'uploads');

try {
    fs.mkdirSync(DIR_TEMP);
    fs.mkdirSync(`${DIR_TEMP}/v1`);
} catch (error) {
    //ignore errors
}

try {
    fs.mkdirSync(DIR_UPLOAD);
    fs.mkdirSync(`${DIR_UPLOAD}/v1`);
} catch (error) {
    // ignore errors
}