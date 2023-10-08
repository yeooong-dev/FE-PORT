import { useDarkMode } from "../darkmode/DarkModeContext";
import { SearchInput, SearchWrap, SerchBtn } from "./StSearchBar";
import { BiSearchAlt } from "react-icons/bi";

function SearchBar() {
  const { darkMode } = useDarkMode();
  return (
    <SearchWrap>
      <SearchInput />
      <SerchBtn darkMode={darkMode}>
        <BiSearchAlt size='32' className='icon' />
      </SerchBtn>
    </SearchWrap>
  );
}

export default SearchBar;
