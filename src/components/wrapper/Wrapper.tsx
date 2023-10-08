import { Outlet } from "react-router-dom";
import NaviBar from "../navigation/NaviBar";
import SearchBar from "../search/SearchBar";
import { Contents, Left, Right, Wrap } from "./StWrapper";
import { useState } from "react";
import { useDarkMode } from "../darkmode/DarkModeContext";

function Wrapper() {
  const { darkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Wrap darkMode={darkMode}>
      <Left>
        <NaviBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </Left>

      <Right isSidebarOpen={isSidebarOpen}>
        <SearchBar />

        <Contents darkMode={darkMode}>
          <Outlet />
        </Contents>
      </Right>
    </Wrap>
  );
}

export default Wrapper;
