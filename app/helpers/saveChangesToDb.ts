import mongoose from 'mongoose';
import { ICategory } from '../api/categories/type';
import { deleteCategories } from './deleteCategories';
import { updateCategory } from './updateCategory';

export const saveChangesToDb = async (
    updatedCategories: ICategory[],
    deletedCategoryIds: mongoose.Types.ObjectId[]
) => {
    try {
        await Promise.all(
            deletedCategoryIds.map(async (id) => {
                await deleteCategories(id);
            })
        );

        await Promise.all(
            updatedCategories.map(async (category) => {
                await updateCategory(category._id, category);
            })
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};
