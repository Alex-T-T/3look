import { Dispatch, SetStateAction, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import mongoose from 'mongoose';

import { ICategory } from '@/app/api/categories/type';
import DeleteButton from './DeleteButton';
import DragAndDrop from './DragAndDrop';
import SwitchButton from './SwitchButton';
import Dialog from './Dialog';

interface ICategoryItemProps {
    category: ICategory;
    onStatusChange: (id: mongoose.Types.ObjectId, isActive: boolean) => void;
    onDelete: (id: mongoose.Types.ObjectId) => void;
    index: number;
    setIsChange: Dispatch<SetStateAction<boolean>>;
}

function CategoryItem({
    category,
    onStatusChange,
    onDelete,
    index,
    setIsChange,
}: ICategoryItemProps) {
    const [isDialog, setIsDialog] = useState(false);

    const handleClick = () => {
        onStatusChange(category._id, category.isActive);
    };

    const handleDelete = () => {
        onDelete(category._id);
    };

    return (
        <>
            {category.name !== 'other' ? (
                <Draggable draggableId={category._id.toString()} index={index}>
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0 ease-linear duration-300"
                        >
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
                                        <DeleteButton
                                            onDelete={() => setIsDialog(true)}
                                        />
                                        <div {...provided.dragHandleProps}>
                                            <DragAndDrop />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-[54px]"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Draggable>
            ) : (
                <div className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0 ease-linear duration-300">
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
                        <div className="w-[54px]"></div>
                    </div>
                </div>
            )}

            {isDialog && (
                <Dialog
                    title="Delete the Category?"
                    onOk={handleDelete}
                    setIsChange={setIsChange}
                    isDialog={isDialog}
                    setIsDialog={setIsDialog}
                >
                    <p className="text-center text-text-second">
                        All templates in the category will be moved to the
                        category &quot;Other&quot;
                    </p>
                </Dialog>
            )}

            {/* <Draggable draggableId={category._id.toString()} index={index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0 ease-linear duration-300"
                    >
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
                                    <div {...provided.dragHandleProps}>
                                        <DragAndDrop />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-[54px]"></div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Draggable> */}
        </>
    );
}

export default CategoryItem;
