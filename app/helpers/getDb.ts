import { promises as fs } from 'fs';

export const getDb = async () =>
    await fs.readFile(process.cwd() + '/db.json', 'utf8');
