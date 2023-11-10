import { NextRequest, NextResponse } from 'next/server';
import { ICategory, ICategoryPost } from '@/app/api/categories/type';

import database from '@/app/database/database';
import categories from '@/app/database/schema/categories/categorySchema';
import categoryValidation from '@/app/database/schema/categories/categoryValidation';

export const GET = async (req: NextRequest) => {
    await database();
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        const res = await categories.find({});

        return NextResponse.json(res);
    }

    const regexPattern = new RegExp(query.split('').join('.*'), 'i');

    const dataByQuery = await categories.find({
        name: { $regex: regexPattern },
    });

    return NextResponse.json(dataByQuery);
};

export const POST = async (req: NextRequest) => {
    console.log('req: ', req);
    await database();
    const data: ICategory = await req.json();
    console.log('data: ', data);

    if (!data.name) {
        return NextResponse.json(
            { message: 'Required fields is missing!' },
            { status: 400 }
        );
    }

    const newData: ICategoryPost = {
        name: data.name.toLowerCase(),
        isActive: false,
    };

    const validBody = categoryValidation.safeParse(newData);

    const isExistingData = await categories.findOne({ name: newData.name });

    if (isExistingData) {
        return NextResponse.json(
            {
                message: `Category with name ${newData.name.toUpperCase()} alredy exist.`,
            },
            { status: 400 }
        );
    }

    if (!validBody.success) {
        return NextResponse.json(validBody.error.issues, { status: 400 });
    }

    try {
        const res = await categories.create(validBody.data);

        return NextResponse.json(res, { status: 201 });
    } catch (error) {
        console.log('error: ', error);
        return NextResponse.json(
            { message: 'Something went wrong' },
            { status: 400 }
        );
    }
};
