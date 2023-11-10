import debounce from 'lodash.debounce';
import { BiSearch } from 'react-icons/bi';

function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
    const handleSearch = debounce((searchValue: string) => {
        onSearch(searchValue);
    }, 300);

    return (
        <div className="relative">
            <input
                className="py-[15px] px-[20px] w-[240px] mobile-l:w-[380px] border border-transparent rounded bg-[#30313C] placeholder:text-text-second placeholder:text-[14px] outline-none"
                placeholder="Search"
                type="text"
                onChange={(event) => handleSearch(event.target.value)}
            />
            <BiSearch className="w-[20px] h-[20px] absolute top-[50%] right-[20px] -translate-x-[50%] -translate-y-[50%] fill-text-second" />
        </div>
    );
}

export default SearchInput;
