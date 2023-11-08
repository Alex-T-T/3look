export const getAllCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );
        if (!res.ok) {
            throw new Error(res.status.toString(), { cause: res });
        }
        const res_1 = res;
        return await res_1.json();
    } catch (error) {
        return console.log(error);
    }
};
