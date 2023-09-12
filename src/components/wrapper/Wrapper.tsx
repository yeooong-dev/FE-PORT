import { Outlet } from "react-router-dom";
import NaviBar from "../navigation/NaviBar";
import SearchBar from "../search/SearchBar";
import { Contents, Left, Right, Top, Wrap } from "./StWrapper";

function Wrapper() {
  return (
    <Wrap>
      <Left>
        <NaviBar />
      </Left>

      <Right>
        <Top>
          <SearchBar />
        </Top>

        <Contents>
          <Outlet />
        </Contents>
      </Right>
    </Wrap>
  );
}

export default Wrapper;
