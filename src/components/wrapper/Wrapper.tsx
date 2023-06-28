import NaviBar from "../navigation/NaviBar";
import SearchBar from "../search/SearchBar";
import { Contents, Left, Logo, Right, Wrap } from "./StWrapper";

function Wrapper() {
    return (
        <Wrap>
            <Left>
                <NaviBar />
            </Left>

            <Right>
                <Contents>
                    <Logo>PORT</Logo>
                    <SearchBar />
                </Contents>
            </Right>
        </Wrap>
    );
}

export default Wrapper;
