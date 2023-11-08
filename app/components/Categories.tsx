'use client';
import CreateButton from './CreateButton';
import Container from './Container';
import CategoryList from './CategoryList';
import Header from './Header';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../helpers/getAllCategories';
import { getCategoryByQuery } from '../helpers/getCategoryByQuery';
import CreateInput from './CreateInput';

export interface ICategory {
    id: number;
    name: string;
    isActive: boolean;
}

function Categories() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    // const [isCreate, setIsCreate] = useState(false);

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

    // const handleCreateClick = () => {
    //     setIsCreate(true)
    // }

    return (
        <>
            <Header onSearch={handleSearch} />
            <main className="relative">
                <Container className="mt-[169px] tablet:mt-[113px]">
                    <CreateButton />
                    <CreateInput />
                    {categories ? (
                        <CategoryList
                            setCategories={setCategories}
                            categories={categories}
                        />
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </Container>
            </main>
        </>
    );
}

export default Categories;
