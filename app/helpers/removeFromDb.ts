import { ICategory } from '../components/Categories';

const fs = require('fs').promises;

export async function removeFromDb(id: number) {
    try {
        const existingData = await fs.readFile('db.json', 'utf8');

        const dataArray: ICategory[] = JSON.parse(existingData);

        const updatedData = dataArray.filter((item) => item.id !== id);
        if (updatedData.length !== dataArray.length) {
            await fs.writeFile(
                process.cwd() + '/db.json',
                JSON.stringify(dataArray, null, 2),
                'utf8'
            );
        } else {
            throw new Error('Object not found at Database');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`An error occurred: ${error.message}`);
        } else if (typeof error === 'string') {
            throw new Error(`An error occurred: ${error}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
