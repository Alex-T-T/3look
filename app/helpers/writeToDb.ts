// const fs = require('fs').promises;

import db from '@/db.json';

export async function writeToDb(data: any) {
    try {
        // const existingData = await fs.readFile('db.json', 'utf8');

        // const dataArray = JSON.parse(existingData);

        // dataArray.push(data);

        // await fs.writeFile(
        //     process.cwd() + '/db.json',
        //     JSON.stringify(dataArray, null, 2),
        //     'utf8'
        // );
        // console.log('New data has been added to db.json');
        db.push(data);
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
}
