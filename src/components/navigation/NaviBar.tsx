import { Link } from "react-router-dom";
import {
  Cal,
  Dm,
  Fam,
  Ment,
  Main,
  Mypage,
  ProfileImg,
  Talk,
  Todo,
  Vac,
  NavBtn,
  Dark,
  Wrap,
} from "./StNavibar";
import { FiHome } from "react-icons/fi";
import { BsCardChecklist, BsCalendarDate } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { IoAirplaneOutline } from "react-icons/io5";
import { CgMailOpen } from "react-icons/cg";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import useIsLogin from "../../hook/useIsLogin";
import useLogout from "../../hook/useLogout";
import { useState } from "react";
import { Logo } from "../wrapper/StWrapper";

function NaviBar() {
  const [isLogin] = useIsLogin();
  const logout = useLogout();
  const [activeMenu, setActiveMenu] = useState("main");

  return (
    <Wrap>
      <Link to='/main'>
        <Logo>PORT</Logo>
      </Link>

      <ProfileImg />

      {isLogin ? (
        <Mypage onClick={logout}>로그아웃</Mypage>
      ) : (
        <Link to='/login'>
          <Mypage>로그인</Mypage>
        </Link>
      )}

      <Link to='/mypage'>
        <Mypage>마이페이지</Mypage>
      </Link>

      <NavBtn>
        <Link to='/main' onClick={() => setActiveMenu("main")}>
          <Main active={activeMenu === "main"}>
            <FiHome size='24' /> &nbsp; 홈
          </Main>
        </Link>

        <Link to='/todo' onClick={() => setActiveMenu("todo")}>
          <Todo active={activeMenu === "todo"}>
            <BsCardChecklist size='24' />
            &nbsp; 오늘의 할일
          </Todo>
        </Link>

        <Link to='/calendar' onClick={() => setActiveMenu("calendar")}>
          <Cal active={activeMenu === "calendar"}>
            <BsCalendarDate size='22' />
            &nbsp; 나의 캘린더
          </Cal>
        </Link>

        <Link to='/event' onClick={() => setActiveMenu("event")}>
          <Fam active={activeMenu === "event"}>
            <TbReportMoney size='24' />
            &nbsp; 경조사 체크
          </Fam>
        </Link>

        <Link to='/vac' onClick={() => setActiveMenu("vac")}>
          <Vac active={activeMenu === "vac"}>
            <IoAirplaneOutline size='24' />
            &nbsp; 휴가 신청
          </Vac>
        </Link>

        {/* <Talk
                        <BiMessageDetail size='23'/>
                        &nbsp; 소통하기
                    </Talk> */}

        <Link to='/chat' onClick={() => setActiveMenu("chat")}>
          <Dm active={activeMenu === "chat"}>
            <CgMailOpen size='23' />
            &nbsp; 대화하기
          </Dm>
        </Link>

        <Dark>
          <FaToggleOn size='24' color='#51449d' />
          {/* <FaToggleOff /> */}
          &nbsp; DarkMode
        </Dark>
      </NavBtn>
    </Wrap>
  );
}

export default NaviBar;
