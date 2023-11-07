import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export const GET = async () => {
    const file = await fs.readFile(process.cwd() + '/db.json', 'utf8');

    if (!file)
        return NextResponse.json(
            { message: 'Something went wrong! Database is sleeping' },
            { status: 500 }
        );

    const data = JSON.parse(file);

    if (!data)
        return NextResponse.json(
            { message: 'Something went wrong! Database is demaged!' },
            { status: 500 }
        );

    return NextResponse.json(data);
};

export const POST = async () => {};
