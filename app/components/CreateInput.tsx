function CreateInput() {
    return (
        <div className="w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0">
            <input
                placeholder="Enter Category Name"
                className="bg-transparent"
            />
        </div>
    );
}

export default CreateInput;
