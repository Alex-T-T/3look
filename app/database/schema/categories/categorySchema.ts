import mongoose, { Schema } from 'mongoose';

interface ICategoryDB {
    name: string;
    isActive: boolean;
}

const categorySchema = new Schema(
    {
        name: String,
        isActive: Boolean,
    },
    { timestamps: true }
);

export default mongoose.models['categories']
    ? mongoose.model<ICategoryDB>('categories')
    : mongoose.model<ICategoryDB>('categories', categorySchema);
