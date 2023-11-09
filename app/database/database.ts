import mongoose from 'mongoose';

const database = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB!);
        console.log('Database was connected');
    } catch (error) {
        new Error('Not connect to database');
    }
};

export default database;
