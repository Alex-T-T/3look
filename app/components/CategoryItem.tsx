import mongoose from 'mongoose';
import { ICategory } from '@/app/api//categories/type';

import DeleteButton from './DeleteButton';
import DragAndDrop from './DragAndDrop';
import SwitchButton from './SwitchButton';

interface ICategoryItemProps {
    category: ICategory;
    onStatusChange: (id: mongoose.Types.ObjectId, isActive: boolean) => void;
    onDelete: (id: mongoose.Types.ObjectId) => void;
}

function CategoryItem({
    category,
    onStatusChange,
    onDelete,
}: ICategoryItemProps) {
    const handleClick = () => {
        onStatusChange(category._id, category.isActive);
    };

    const handleDelete = () => {
        onDelete(category._id);
    };

    return (
        <div className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0 hover:scale-105 focus:scale-105 ease-linear duration-300">
            <p
                className={
                    category.isActive
                        ? 'text-[14px] capitalize'
                        : 'text-[14px] text-switch-off-text capitalize'
                }
            >
                {category.name}
            </p>
            <div className="flex items-center space-x-5">
                <SwitchButton
                    isActive={category.isActive}
                    onChange={handleClick}
                />
                {category.name !== 'other' ? (
                    <>
                        <DeleteButton onDelete={handleDelete} />
                        <DragAndDrop />
                    </>
                ) : (
                    <>
                        <div className="w-[54px]"></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CategoryItem;
