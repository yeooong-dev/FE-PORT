import { useState, ChangeEvent, FormEvent } from "react";
import { useSearchResults } from "./SearchResultsContext";
import { Search, SearchBtn, SearchInput, SearchWrap } from "./StSearchBar";
import { BiSearchAlt } from "react-icons/bi";
import instance from "../../api/instance";
import { useDarkMode } from "../darkmode/DarkModeContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { setSearchResults, setLastSearchTerm } = useSearchResults();
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);

  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

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
    setSearchInputVisible(!searchInputVisible);
    if (!searchInputVisible) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 300);
    }
  };

  return (
    <SearchWrap onSubmit={handleSubmit}>
      <SearchBtn onClick={toggleSearchInput} darkMode={darkMode}>
        <BiSearchAlt size='32' className='icon' />
      </SearchBtn>
      {searchInputVisible && (
        <>
          <SearchInput
            id='search-input'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={
              isSearchAttempted && !searchTerm ? "검색어를 입력해주세요." : ""
            }
            visible={searchInputVisible}
          />
          <Search onClick={handleSearchSubmit} darkMode={darkMode}>
            검색
          </Search>
        </>
      )}
    </SearchWrap>
  );
}

export default SearchBar;
