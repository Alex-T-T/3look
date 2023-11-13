'use client';

import { useEffect, useState } from 'react';

import mongoose from 'mongoose';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateButton from './CreateButton';
import Container from './Container';
import CategoryList from './CategoryList';
import Header from './Header';
import { getAllCategories } from '../helpers/getAllCategories';
import { getCategoryByQuery } from '@/app/helpers/getCategoryByQuery';
import CreateInput from './CreateInput';
import { ICategory } from '@/app/api//categories/type';
import { createCategory } from '../helpers/createCategory';
import { saveChangesToDb } from '../helpers/saveChangesToDb';

function Categories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [updatedCategories, setUpdatedCategories] = useState<ICategory[]>([]);
    const [deletedCategoryIds, setDeletedCategoryIds] = useState<
        mongoose.Types.ObjectId[]
    >([]);

    useEffect(() => {
        setIsLoading(true);
        getAllCategories()
            .then((res) => {
                setCategories(res);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSearch = async (query: string) => {
        getCategoryByQuery(query)
            .then((res) => setCategories(res))
            .catch((error) => console.log(error));
    };

    const handleInputCreateChange = (value: string) => {
        setInputValue(value);
    };

    const handleCreate = async () => {
        if (!inputValue || inputValue.length < 2) {
            toast.error('Not correct name. Try again!');
            return;
        }

        try {
            const newCategory = await createCategory(inputValue);
            setCategories((prev) => [newCategory, ...prev]);

            setInputValue('');
            toast.success('New category successfully created');
        } catch (error) {
            if (error && typeof error === 'object' && 'cause' in error) {
                toast.error((error as { cause: string }).cause);
            } else {
                console.error(error);
            }
        }
    };

    const handleUpdate = (id: mongoose.Types.ObjectId, status: boolean) => {
        setCategories((prev) => {
            return prev.map((category) => {
                return category._id !== id
                    ? category
                    : { ...category, isActive: !status };
            });
        });

        const categoryToUpdate = categories.find(
            (category) => category._id === id
        ) as ICategory;

        setUpdatedCategories((prev) => {
            const index = prev.findIndex((category) => category._id === id);

            if (index === -1) {
                return [...prev, { ...categoryToUpdate, isActive: !status }];
            }

            prev[index] = { ...categoryToUpdate, isActive: !status };
            return prev;
        });
    };

    const handleDelete = (id: mongoose.Types.ObjectId) => {
        setCategories((prev) => prev.filter((category) => category._id !== id));

        setDeletedCategoryIds((prev) => [...prev, id]);
    };

    const handleSaveChanges = async () => {
        if (!updatedCategories.length && !deletedCategoryIds.length) {
            toast.info('Nothing to save!');
            return;
        }

        try {
            await saveChangesToDb(updatedCategories, deletedCategoryIds);

            setUpdatedCategories([]);
            setDeletedCategoryIds([]);

            toast.success('Changes saved successfully');
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleOnDragEnd: OnDragEndResponder = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newCategories = [...categories];
        newCategories.splice(source.index, 1);
        newCategories.splice(destination.index, 0, categories[source.index]);

        setCategories(newCategories);
    };

    return (
        <>
            <Header onSearch={handleSearch} />
            <main className="relative">
                <Container className="mt-[169px] tablet:mt-[113px]">
                    <CreateButton handleCreate={handleCreate} />
                    <CreateInput
                        onChange={handleInputCreateChange}
                        value={inputValue}
                    />

                    {categories && (
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <CategoryList
                                setCategories={setCategories}
                                categories={categories}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                onSave={handleSaveChanges}
                                setUpdatedCategories={setUpdatedCategories}
                                setDeletedCategoryIds={setDeletedCategoryIds}
                            />
                        </DragDropContext>
                    )}
                    {isLoading && <p className="text-center">Loading...</p>}
                </Container>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </main>
        </>
    );
}

export default Categories;
