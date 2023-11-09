import { NextRequest, NextResponse } from 'next/server';
import { ICategoryPost } from './type';
import { ICategory } from '@/app/components/Categories';
import { writeToDb } from '@/app/helpers/writeToDb';

import db from '@/db.json';

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(db);
    }

    const dataByQuery = db.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json(dataByQuery);
};

export const POST = async (req: NextRequest) => {
    const data: ICategoryPost = await req.json();

    if (!data.name) {
        return NextResponse.json(
            { message: 'Required fields is missing!' },
            { status: 400 }
        );
    }

    const newData: ICategory = {
        id: Date.now(),
        name: data.name.toLowerCase(),
        isActive: false,
    };

    await writeToDb(newData);

    return NextResponse.json(
        { message: 'Successfully created' },
        { status: 201 }
    );
};
