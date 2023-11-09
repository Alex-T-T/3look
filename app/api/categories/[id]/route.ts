import { NextRequest, NextResponse } from 'next/server';
import { ICategoryUpdate } from '../type';

import mongoose from 'mongoose';

import database from '@/app/database/database';
import categories from '@/app/database/schema/categories/categorySchema';

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
    await database();
    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json(
            { message: 'Category id is not valid ObjectId' },
            { status: 404 }
        );
    }

    const category = await categories.findById(params.id);

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

    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json(
            { message: 'Category id is not valid ObjectId' },
            { status: 404 }
        );
    }

    if (!data.name && typeof data.isActive !== 'boolean') {
        return NextResponse.json(
            { message: 'All empty fields is not allowed!' },
            { status: 400 }
        );
    }

    try {
        await categories.findOneAndUpdate({ _id: params.id }, { $set: data });
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
    await database();
    if (!params.id || !mongoose.Types.ObjectId.isValid(params.id)) {
        return NextResponse.json(
            { message: 'Category id is not valid ObjectId' },
            { status: 404 }
        );
    }

    try {
        await categories.findByIdAndDelete(params.id);

        return NextResponse.json(
            { message: 'Successfully deleted' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
