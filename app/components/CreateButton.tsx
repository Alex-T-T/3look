import { FiPlus } from 'react-icons/fi';

interface ICreteButtonProps {
    handleCreate: () => void;
}

function CreateButton({ handleCreate }: ICreteButtonProps) {
    const handleSubmit = () => {
        handleCreate();
    };

    return (
        <button
            type="submit"
            className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border border-transparent rounded bg-create-btn py-[14px] flex flex-row items-center justify-center mb-3 shadow-action-btn hover:scale-105 focus:scale-105 ease-linear duration-300"
            onClick={handleSubmit}
        >
            <FiPlus className="w-[14px] h-[14px] mr-[10px] font-[satoshi-regular]" />
            Create a Category
        </button>
    );
}

export default CreateButton;
