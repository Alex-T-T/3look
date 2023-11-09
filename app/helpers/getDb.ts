import { promises as fs } from 'fs';

export const getDb = async () => await fs.readFile('db.json', 'utf8');
