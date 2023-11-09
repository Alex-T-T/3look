import db from '@/db.json';

export async function writeToDb(data: any) {
    try {
        db.push(data);
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
}
