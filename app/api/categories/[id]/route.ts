import { NextRequest, NextResponse } from 'next/server';
import { ICategoryUpdate } from '../type';
import { updateDb } from '@/app/helpers/updateDb';
import { getDb } from '@/app/helpers/getDb';
import { ICategory } from '@/app/components/Categories';
import { error } from 'console';
import { removeFromDb } from '@/app/helpers/removeFromDb';

export const GET = async (
    req: NextRequest,
    {
        params,
    }: {
        params: {
            id: string;
        };
    }
) => {
    if (!params.id) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

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

    const category = data.find((item) => {
        if (item.id === +params.id) {
            return item;
        }
    });

    if (!category) {
        return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    return NextResponse.json(category);
};

export const PATCH = async (
    req: NextRequest,
    {
        params,
    }: {
        params: {
            id: string;
        };
    }
) => {
    const data: ICategoryUpdate = await req.json();

    if (!data.name && !data.isActive) {
        return NextResponse.json(
            { message: 'Empty fields is not allowed!' },
            { status: 400 }
        );
    }

    try {
        await updateDb(data, +params.id);
    } catch (error) {
        return NextResponse.json(
            { error: 'This item does not exist at Database' },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: 'Successfully updated' },
        { status: 200 }
    );
};

export const DELETE = async (
    req: NextRequest,
    {
        params,
    }: {
        params: {
            id: string;
        };
    }
) => {
    if (!params.id) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    try {
        await removeFromDb(+params.id);
    } catch (error) {
        return NextResponse.json(
            { error: 'This item does not exist at Database' },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: 'Successfully deleted' },
        { status: 200 }
    );
};
