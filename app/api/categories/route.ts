import { NextRequest, NextResponse } from 'next/server';
import { ICategoryPost } from './type';
import { ICategory } from '@/app/components/Categories';
import { writeToDb } from '@/app/helpers/writeToDb';
import { getDb } from '@/app/helpers/getDb';

export const GET = async (req: NextRequest) => {
    const file = await getDb();

    if (!file)
        return NextResponse.json(
            { message: 'Something went wrong! Database is sleeping' },
            { status: 500 }
        );

    const data: ICategory[] = JSON.parse(file);

    if (!data)
        return NextResponse.json(
            { message: 'Something went wrong! Database is corrupt!' },
            { status: 500 }
        );

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(data);
    }

    const dataByQuery = data.filter((item) =>
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
