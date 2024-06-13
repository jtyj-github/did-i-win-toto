import { fetch } from './fetch';
import fs from 'fs';

export async function getJSON<T>(url: string): Promise<T> {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error(error);
        throw new Error('Problem with fetching data');
    }
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