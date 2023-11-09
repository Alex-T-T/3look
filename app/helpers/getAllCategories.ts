export const getAllCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );

        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res });
        }

        return await res.json();
    } catch (error) {
        return console.log(error);
    }
};
