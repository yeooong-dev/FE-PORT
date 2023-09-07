import { Link } from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";

function Main() {
    return (
        <>
            <Wrapper />
            <Link to='/login'>시작하러 가기</Link>
        </>
    );
}

export default Main;
