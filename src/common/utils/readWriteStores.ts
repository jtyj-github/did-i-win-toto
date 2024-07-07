import fs from 'fs';
import path from 'path';
import { DIR_TEMP, DIR_UPLOAD } from './manageDirs';
import dotenv from 'dotenv';

dotenv.config();
const isProd = process.env.NODE_ENV === 'production';

export function readStores<T>(fileName: string, type: 'temp' | 'upload'): T {
    const folderLocation = type === 'upload' ? DIR_TEMP : DIR_UPLOAD;
    const filePath = path.join(folderLocation, fileName);

    if (!fs.existsSync(filePath)) {
        return {} as T;
    }
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'});

    return JSON.parse(data) as T;
}

export function writeStores<T>(fileName: string, data: T, type: 'temp' | 'upload'): void {
    const folderLocation = type === 'upload' ? DIR_TEMP : DIR_UPLOAD;
    const filePath = path.join(folderLocation, fileName);

    fs.writeFileSync(filePath, JSON.stringify(data, null, isProd ? 0 : 2));
}