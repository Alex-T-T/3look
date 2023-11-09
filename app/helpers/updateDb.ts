import { ICategory } from '../components/Categories';

const fs = require('fs').promises;

export async function updateDb(data: any, id: number) {
    try {
        const existingData = await fs.readFile('db.json', 'utf8');

        const dataArray: ICategory[] = JSON.parse(existingData);

        const index = dataArray.findIndex((item) => item.id === id);
        if (index !== -1) {
            dataArray[index] = { ...dataArray[index], ...data };

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
