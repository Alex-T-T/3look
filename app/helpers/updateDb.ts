import db from '@/db.json';

export async function updateDb(data: any, id: number) {
    try {
        const index = db.findIndex((item) => item.id === id);
        if (index !== -1) {
            db[index] = { ...db[index], ...data };
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
