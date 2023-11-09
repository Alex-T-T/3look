export const getCategoryByQuery = async (query: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?query=${query}`
    );
    if (!res.ok) {
        throw new Error(res.status.toString(), { cause: res });
    }

    return await res.json();
};
