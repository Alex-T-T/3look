import { error } from 'console';

export const createCategory = async (value: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: value }),
    };

    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        requestOptions
    ).then((res) => {
        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res.statusText });
        }
        return res.json();
    });
};
