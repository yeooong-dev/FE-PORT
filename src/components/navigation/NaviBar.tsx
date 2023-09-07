import { Link } from "react-router-dom";
import { Cal, Dm, Fam, Ment, My, Main, Mypage, ProfileImg, Talk, Todo, Vac, We, NavBtn, Dark } from "./StNavibar";
import { FiHome } from "react-icons/fi";
import { BsCardChecklist, BsCalendarDate } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { IoAirplaneOutline } from "react-icons/io5";
import { CgMailOpen } from "react-icons/cg";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

function NaviBar() {
    return (
        <>
            <ProfileImg />
            <Link to='/login'>
                <li>로그인</li>
            </Link>

            <Link to='/mypage'>
                <Mypage>마이페이지</Mypage>
            </Link>

            <NavBtn>
                <My>
                    <Main>
                        <FiHome size='24' color='white' /> &nbsp; 홈
                    </Main>

                    <Todo>
                        <BsCardChecklist size='24' color='#51449d' />
                        &nbsp; 오늘의 할일
                    </Todo>
                    <Cal>
                        <BsCalendarDate size='22' color='#51449d' />
                        &nbsp; 나의 캘린더
                    </Cal>
                    <Fam>
                        <TbReportMoney size='24' color='#51449d' />
                        &nbsp; 경조사 체크
                    </Fam>
                </My>

                <We>
                    <Vac>
                        <IoAirplaneOutline size='24' color='#51449d' />
                        &nbsp; 휴가 신청
                    </Vac>
                    {/* <Talk
                        <BiMessageDetail size='23' color='#51449d' />
                        &nbsp; 소통하기
                    </Talk> */}
                    <Dm>
                        <CgMailOpen size='23' color='#51449d' />
                        &nbsp; 쪽지보내기
                    </Dm>
                </We>

                <Dark>
                    <FaToggleOn size='24' color='#51449d' />
                    {/* <FaToggleOff /> */}
                    &nbsp; DarkMode
                </Dark>
            </NavBtn>
        </>
    );
}

export default NaviBar;
