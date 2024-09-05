import fs from 'fs';
import path from 'path';

const DIR_TEMP = path.join(process.cwd(), 'temp');
const DIR_UPLOAD = path.join(process.cwd(), 'uploads');

try {
    fs.mkdirSync(DIR_TEMP);
    fs.mkdirSync(`${DIR_TEMP}`);
} catch (error) {
    //ignore errors
}

try {
    fs.mkdirSync(DIR_UPLOAD);
    fs.mkdirSync(`${DIR_UPLOAD}`);
} catch (error) {
    // ignore errors
}

export { DIR_TEMP, DIR_UPLOAD };