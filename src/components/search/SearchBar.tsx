import ReactDOM from "react-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSearchResults } from "./SearchResultsContext";
import {
  Action,
  Dark,
  ModalBackground,
  Mode,
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
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

interface SearchBarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  mode: "FaPeopleGroup" | "IoMdPerson";
  setMode: React.Dispatch<React.SetStateAction<"FaPeopleGroup" | "IoMdPerson">>;
}

function SearchBar({
  setIsSidebarOpen,
  isSidebarOpen,
  mode,
  setMode,
}: SearchBarProps) {
  const { setSearchResults, setLastSearchTerm } = useSearchResults();
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeMode = () => {
    if (mode === "FaPeopleGroup") {
      setMode("IoMdPerson");
      navigate("/main");
    } else {
      setMode("FaPeopleGroup");
      navigate("/chat");
    }
  };

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("검색 결과를 가져오는 중 에러가 발생했습니다:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  const toggleSearchInput = () => {
    if (window.innerWidth <= 880) {
      setIsModalOpen(true);
    } else {
      if (!searchInputVisible) {
        setTimeout(() => {
          setSearchInputVisible(true);
        }, 0);
      } else {
        setSearchInputVisible(false);
      }
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

  const toggleModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(!isModalOpen);
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

      <Mode
        darkMode={darkMode}
        visible={searchInputVisible}
        isSidebarOpen={isSidebarOpen}
        onClick={changeMode}
      >
        {mode === "FaPeopleGroup" ? (
          <FaPeopleGroup color='#3c57b3' />
        ) : (
          <IoMdPerson color='#3c57b3' />
        )}
      </Mode>

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

        {searchInputVisible && !isModalOpen && (
          <Action
            darkMode={darkMode}
            visible={searchInputVisible}
            isSidebarOpen={isSidebarOpen}
          >
            <SearchInput
              autoFocus
              id='search-input'
              value={searchTerm}
              onChange={handleSearchChange}
              isSidebarOpen={isSidebarOpen}
              placeholder={
                isSearchAttempted && !searchTerm ? "검색어를 입력해주세요." : ""
              }
              visible={searchInputVisible}
              darkMode={darkMode}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
            />
            <Search onClick={handleSearchSubmit} darkMode={darkMode}>
              검색
            </Search>
          </Action>
        )}

        {isModalOpen &&
          ReactDOM.createPortal(
            <ModalBackground isModalOpen={isModalOpen} onClick={toggleModal}>
              <Action
                darkMode={darkMode}
                visible={true}
                isSidebarOpen={isSidebarOpen}
              >
                <SearchInput
                  autoFocus
                  id='search-input'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  isSidebarOpen={isSidebarOpen}
                  placeholder={
                    isSearchAttempted && !searchTerm
                      ? "검색어를 입력해주세요."
                      : ""
                  }
                  visible={true}
                  darkMode={darkMode}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearchSubmit();
                    }
                  }}
                />
                <Search onClick={handleSearchSubmit} darkMode={darkMode}>
                  검색
                </Search>
              </Action>
            </ModalBackground>,
            document.body
          )}
      </SearchRight>
    </SearchWrap>
  );
}

export default SearchBar;
