export const getAllCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );

        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res });
        }
        const categories = await res.json();
        const reversedCategories = categories.toReversed();
        return reversedCategories;
    } catch (error) {
        return console.log(error);
    }
};
