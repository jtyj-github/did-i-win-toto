import fs from 'fs';

import { fetch } from '@/common/utils/fetch';


export async function getJSON<T>(url: string): Promise<T> {
    const data: T = await fetch(url)
    .then((response) =>{
        return response.json() as Promise<T>;
    })
    .catch((error) => {
        console.error(error);
        return Promise.reject('Invalid JSON');
    });
    
    return data;
}

export async function readLocalJSON<T>(filePath: string): Promise<T> {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as T;
    } catch (error) {
        console.error(error);
        throw new Error('Problem with reading local JSON file');
    }
}