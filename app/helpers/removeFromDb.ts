import db from '@/db.json';

export async function removeFromDb(id: number) {
    try {
        const updatedData = db.filter((item) => item.id !== id);
        if (updatedData.length !== db.length) {
            return updatedData;
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
