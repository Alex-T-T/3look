'use client';

import { useEffect, useState } from 'react';

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

function Categories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        getAllCategories()
            .then((res) => setCategories(res))
            .catch((error) => console.log(error));
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
            console.log(error);
        }
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

                    {categories ? (
                        <CategoryList
                            setCategories={setCategories}
                            categories={categories}
                        />
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
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
