import { FiPlus } from 'react-icons/fi';

function CreateButton() {
    return (
        <button
            type="submit"
            className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border border-transparent rounded bg-create-btn py-[14px] flex flex-row items-center justify-center mb-3 shadow-action-btn hover:scale-105 focus:scale-105"
        >
            <FiPlus className="w-[14px] h-[14px] mr-[10px]" />
            CreateButton
        </button>
    );
}

export default CreateButton;
