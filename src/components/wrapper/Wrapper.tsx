import { Outlet } from "react-router-dom";
import NaviBar from "../navigation/NaviBar";
import SearchBar from "../search/SearchBar";
import { Contents, Left, Right, Wrap } from "./StWrapper";
import { useEffect, useState } from "react";
import { useDarkMode } from "../darkmode/DarkModeContext";

function Wrapper() {
  const { darkMode } = useDarkMode();
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const storedIsSidebarOpen = localStorage.getItem("isSidebarOpen");
    return storedIsSidebarOpen !== null ? storedIsSidebarOpen === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", isSidebarOpen.toString());
  }, [isSidebarOpen]);

  return (
    <Wrap darkMode={darkMode} searchInputVisible={searchInputVisible}>
      <Left>
        <NaviBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </Left>

      <Right isSidebarOpen={isSidebarOpen}>
        <SearchBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Contents darkMode={darkMode}>
          <Outlet />
        </Contents>
      </Right>
    </Wrap>
  );
}

export default Wrapper;
