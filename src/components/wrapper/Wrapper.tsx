import { Outlet } from "react-router-dom";
import NaviBar from "../navigation/NaviBar";
import SearchBar from "../search/SearchBar";
import { Contents, Left, Right, Wrap } from "./StWrapper";
import { useEffect, useState } from "react";
import { useDarkMode } from "../darkmode/DarkModeContext";

function Wrapper() {
  const storedMode = localStorage.getItem("mode");
  const initialMode =
    storedMode === "IoMdPerson" ? "IoMdPerson" : "FaPeopleGroup";
  const [mode, setMode] = useState<"FaPeopleGroup" | "IoMdPerson">(initialMode);
  const { darkMode } = useDarkMode();
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const storedIsSidebarOpen = localStorage.getItem("isSidebarOpen");
    return storedIsSidebarOpen !== null ? storedIsSidebarOpen === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", isSidebarOpen.toString());
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <Wrap darkMode={darkMode} searchInputVisible={searchInputVisible}>
      <Left>
        <NaviBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          mode={mode}
        />
      </Left>

      <Right isSidebarOpen={isSidebarOpen}>
        <SearchBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          mode={mode}
          setMode={setMode}
        />
        <Contents darkMode={darkMode}>
          <Outlet />
        </Contents>
      </Right>
    </Wrap>
  );
}

export default Wrapper;
