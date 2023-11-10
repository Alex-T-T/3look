import mongoose from 'mongoose';
import { ICategoryUpdate } from '../api/categories/type';

export const updateCategory = async (
    id: mongoose.Types.ObjectId,
    data: ICategoryUpdate
) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    );
};
