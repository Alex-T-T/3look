import { ICategory } from './Categories';
import SwitchButton from './SwitchButton';

interface ICategoryItemProps {
    category: ICategory;
    onStatusChange: (id: string, isActive: boolean) => void;
}

function CategoryItem({ category, onStatusChange }: ICategoryItemProps) {
    const handleClick = () => {
        onStatusChange(category.id, category.isActive);
    };

    return (
        <div className=" w-[240px] mobile-l:w-[380px] tablet:w-[638px] mx-auto border-2 border-list-item-border rounded bg-list-item py-3 px-5 flex flex-row items-center justify-between mb-3 last:mb-0">
            <p
                className={
                    category.isActive
                        ? 'text-[14px]'
                        : 'text-[14px] text-switch-off-text'
                }
            >
                {category.name}
            </p>
            <SwitchButton isActive={category.isActive} onChange={handleClick} />
        </div>
    );
}

export default CategoryItem;
