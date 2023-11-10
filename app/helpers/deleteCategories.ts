import mongoose from 'mongoose';

export const deleteCategories = async (id: mongoose.Types.ObjectId) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
            method: 'DELETE',
        }
    );
};
