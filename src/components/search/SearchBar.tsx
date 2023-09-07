import { SearchInput, SearchWrap, SerchBtn } from "./StSearchBar";
import { BiSearchAlt } from "react-icons/bi";

function SearchBar() {
    return (
        <SearchWrap>
            <SearchInput />
            <SerchBtn>
                <BiSearchAlt size='30' color='#2a3642' />
            </SerchBtn>
        </SearchWrap>
    );
}

export default SearchBar;
