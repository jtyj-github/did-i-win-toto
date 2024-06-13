import fs from 'fs';
import path from 'path';
import { DIR_TEMP, DIR_UPLOAD } from './manageDirs';

export function readStores<T>(fileName: string, type: 'temp' | 'upload' = 'temp'): T {
    const folderLocation = type === 'temp' ? DIR_TEMP : DIR_UPLOAD;
    const filePath = path.join(folderLocation, fileName);

    if (!fs.existsSync(filePath)) {
        return {} as T;
    }
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'});

    return JSON.parse(data) as T;
}