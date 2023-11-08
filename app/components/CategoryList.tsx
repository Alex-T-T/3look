'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ICategory } from './Categories';
import CategoryItem from './CategoryItem';
import { getAllCategories } from '../helpers/getAllCategories';

function CategoryList({
    categories,
    setCategories,
}: {
    categories: ICategory[];
    setCategories: Dispatch<SetStateAction<ICategory[]>>;
}) {
    const [isChange, setIsChange] = useState(false);

    const defaultCategories = categories;

    const handleStatusChange = (id: number, status: boolean) => {
        const category = categories.find((category) => category.id === id);

        if (category?.name.toLowerCase() === 'other') return;

        setCategories((prev) => {
            return prev.map((category) => {
                if (category.id !== id) {
                    return category;
                }

                return { ...category, isActive: !status };
            });
        });
        setIsChange(true);
    };

    const handleDelete = (id: number) => {
        const category = categories.find((category) => category.id === id);

        if (category?.name.toLowerCase() === 'other') return;

        setCategories((prev) => {
            const updatedCategoryList = prev.filter(
                (category) => category.id !== id
            );

            if (updatedCategoryList.length === prev.length) {
                alert('Category does not exist');
                return prev;
            }
            return updatedCategoryList;
        });
        setIsChange(true);
    };

    return (
        <>
            {categories ? (
                categories?.map((category: ICategory) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p>Loading...</p>
            )}
            {isChange && (
                <div className="mx-auto flex items-center justify-center bg-main-bg z-50">
                    <button
                        type="submit"
                        className="w-[306px] flex items-center justify-center border border-transparent rounded bg-save-btn py-4 shadow-action-btn text-[16px] mr-[26px]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="mr-[10px]"
                        >
                            <g clipPath="url(#clip0_207_1191)">
                                <path
                                    d="M18.3337 9.2333V9.99997C18.3326 11.797 17.7507 13.5455 16.6748 14.9848C15.5988 16.4241 14.0864 17.477 12.3631 17.9866C10.6399 18.4961 8.79804 18.4349 7.11238 17.8121C5.42673 17.1894 3.98754 16.0384 3.00946 14.5309C2.03138 13.0233 1.56682 11.24 1.68506 9.4469C1.80329 7.65377 2.498 5.94691 3.66556 4.58086C4.83312 3.21482 6.41098 2.26279 8.16382 1.86676C9.91665 1.47073 11.7505 1.65192 13.392 2.3833"
                                    stroke="white"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.3333 3.33325L10 11.6749L7.5 9.17492"
                                    stroke="white"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_207_1191">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="w-[306px] text-[16px] text-center bg-transparent border-[3px] border-cancel-btn py-4 rounded shadow-action-bt"
                        onClick={() => {
                            getAllCategories()
                                .then((res) => setCategories(res))
                                .catch((error) => console.log(error));
                            setIsChange(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </>
    );
}

export default CategoryList;
