import { Link } from "react-router-dom";
import { Cal, Dm, Fam, Ment, My, Main, Mypage, ProfileImg, Talk, Todo, Vac, We, NavBtn } from "./StNavibar";

function NaviBar() {
    return (
        <>
            <ProfileImg />
            {/* <Ment>nickname님 환영합니다.</Ment> */}
            <Link to='/login'>
                <li>로그인</li>
            </Link>

            <Mypage>마이페이지</Mypage>

            <NavBtn>
                <My>
                    <Main>홈</Main>
                    <Todo>오늘의 할일</Todo>
                    <Cal>나의 캘린더</Cal>
                    <Fam>경조사 체크</Fam>
                </My>

                <We>
                    <Vac>휴가 신청</Vac>
                    <Talk>소통하기</Talk>
                    <Dm>쪽지보내기</Dm>
                </We>

                <li>다크모드</li>
            </NavBtn>
        </>
    );
}

export default NaviBar;
