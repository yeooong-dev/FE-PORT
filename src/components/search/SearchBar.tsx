import { useState, ChangeEvent, FormEvent } from "react";
import { useSearchResults } from "./SearchResultsContext";
import {
  Action,
  Dark,
  Search,
  SearchBtn,
  SearchInput,
  SearchRight,
  SearchWrap,
} from "./StSearchBar";
import { BiSearchAlt } from "react-icons/bi";
import instance from "../../api/instance";
import { useDarkMode } from "../darkmode/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";

interface SearchBarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
}

function SearchBar({ setIsSidebarOpen, isSidebarOpen }: SearchBarProps) {
  const { setSearchResults, setLastSearchTerm } = useSearchResults();
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);

  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setAlertMessage("");
  };

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) {
      setAlertMessage("검색어를 입력해주세요.");
      setIsSearchAttempted(true);
      return;
    }

    setLastSearchTerm(searchTerm);

    try {
      const response = await instance.get(
        `/search?q=${encodeURIComponent(searchTerm)}`
      );
      setSearchResults(response.data);
      navigate("/search-results");
    } catch (error) {
      console.error("검색 결과를 가져오는 중 에러가 발생했습니다:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  const toggleSearchInput = () => {
    if (!searchInputVisible) {
      setTimeout(() => {
        setSearchInputVisible(true);
      }, 0);
    } else {
      setSearchInputVisible(false);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 550) {
      setIsSidebarOpen(!isSidebarOpen);
      setSearchInputVisible(false);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <SearchWrap
      onSubmit={handleSubmit}
      darkMode={darkMode}
      visible={searchInputVisible}
      isSidebarOpen={isSidebarOpen}
    >
      <div className='open_btn' onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <HiOutlineMenuAlt3 size='32' />
        ) : (
          <HiOutlineMenuAlt2 size='32' />
        )}
      </div>

      <Dark
        onClick={toggleDarkMode}
        darkMode={darkMode}
        visible={searchInputVisible}
        isSidebarOpen={isSidebarOpen}
      >
        {darkMode ? (
          <BsFillMoonFill size='20' color='#ebb05e' />
        ) : (
          <BsSunFill size='25' color='#ebb05e' />
        )}
      </Dark>

      <SearchRight>
        <SearchBtn
          onClick={toggleSearchInput}
          darkMode={darkMode}
          visible={searchInputVisible}
          isSidebarOpen={isSidebarOpen}
        >
          <BiSearchAlt size='32' className='icon' />
        </SearchBtn>

        {searchInputVisible && (
          <Action
            darkMode={darkMode}
            visible={searchInputVisible}
            isSidebarOpen={isSidebarOpen}
          >
            <SearchInput
              id='search-input'
              value={searchTerm}
              onChange={handleSearchChange}
              isSidebarOpen={isSidebarOpen}
              placeholder={
                isSearchAttempted && !searchTerm ? "검색어를 입력해주세요." : ""
              }
              visible={searchInputVisible}
              darkMode={darkMode}
            />
            <Search onClick={handleSearchSubmit} darkMode={darkMode}>
              검색
            </Search>
          </Action>
        )}
      </SearchRight>
    </SearchWrap>
  );
}

export default SearchBar;
