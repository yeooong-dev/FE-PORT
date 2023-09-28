import { SearchInput, SearchWrap, SerchBtn } from "./StSearchBar";
import { BiSearchAlt } from "react-icons/bi";

function SearchBar() {
    return (
        <SearchWrap>
            <SearchInput />
            <SerchBtn>
                <BiSearchAlt size='32' color='#51439d' />
            </SerchBtn>
        </SearchWrap>
    );
}

export default SearchBar;
