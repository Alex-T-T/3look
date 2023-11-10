import { ChangeEvent, LegacyRef, MutableRefObject } from 'react';
import DeleteButton from './DeleteButton';
import DragAndDrop from './DragAndDrop';
import SwitchButton from './SwitchButton';

function CreateInput({
    onChange,
    value,
}: {
    onChange: (value: string) => void;
    value: string;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0">
            <input
                placeholder="Enter Category Name"
                className="bg-transparent border border-transparent rounded outline-none"
                onChange={handleChange}
                value={value}
            />
            <div className="flex items-center space-x-5">
                <SwitchButton />
                <DeleteButton />
                <DragAndDrop />
            </div>
        </div>
    );
}

export default CreateInput;
