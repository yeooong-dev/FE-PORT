import { Cal, Dm, Fam, Logo, Ment, My, Mypage, ProfileImg, Talk, Todo, Vac, We } from "./StNavibar";

function NaviBar() {
    return (
        <>
            <Logo>로고</Logo>
            <ProfileImg />
            <Ment>nickname님 환영합니다.</Ment>
            <Mypage>마이페이지</Mypage>
            <ul>
                <My>
                    <Todo>오늘의 할일</Todo>
                    <Cal>나의 캘린더</Cal>
                    <Fam>경조사 체크</Fam>
                </My>

                <We>
                    <Vac>휴가 신청</Vac>
                    <Talk>소통하기</Talk>
                    <Dm>쪽지보내기</Dm>
                </We>

                <li>로그인</li>
                <li>다크모드</li>
            </ul>
        </>
    );
}

export default NaviBar;
