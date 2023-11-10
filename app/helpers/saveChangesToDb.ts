import mongoose from 'mongoose';
import { ICategory } from '../api/categories/type';

export const saveChangesToDb = async (
    updatedCategories: ICategory[],
    deletedCategoryIds: mongoose.Types.ObjectId[]
) => {
    console.log('updatedCategories => ', updatedCategories);
    console.log('deletedCategoryIds => ', deletedCategoryIds);
};
