import React from 'react';
import CreateButton from './CreateButton';
import Container from './Container';
import CategoryList from './CategoryList';

export interface ICategory {
    id: string;
    name: string;
    isActive: boolean;
}

async function Categories() {
    const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    ).then((res) => {
        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res });
        }
        return res;
    });

    const categories: ICategory[] = await data.json();

    return (
        <>
            <Container className="mt-[169px] tablet:mt-[113px]">
                <CreateButton />
                <CategoryList categories={categories} />
            </Container>
        </>
    );
}

export default Categories;
