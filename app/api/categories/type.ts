import mongoose from 'mongoose';

export interface ICategory {
    _id: mongoose.Types.ObjectId;
    name: string;
    isActive: boolean;
}

export type ICategoryPost = Omit<ICategory, '_id'>;

export interface ICategoryUpdate {
    name?: string;
    isActive?: boolean;
}
