import { Link } from "react-router-dom";
import {
  Cal,
  Fam,
  Ment,
  Main,
  Mypage,
  ProfileImg,
  Talk,
  Todo,
  NavBtn,
  Dark,
  Wrap,
  Log,
} from "./StNavibar";
import { FiHome } from "react-icons/fi";
import { BsCardChecklist, BsCalendarDate } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import useIsLogin from "../../hook/useIsLogin";
import useLogout from "../../hook/useLogout";
import { useState } from "react";
import { Logo } from "../wrapper/StWrapper";
import useUser from "../../hook/UseUser";

function NaviBar() {
  const [isLogin] = useIsLogin();
  const logout = useLogout();
  const [activeMenu, setActiveMenu] = useState("main");
  const user = useUser();

  return (
    <Wrap>
      <Link to='/main'>
        <Logo>PORT</Logo>
      </Link>

      <ProfileImg />
      <Ment>
        {user && user.name ? `${user.name}님 환영합니다.` : "환영합니다."}
      </Ment>

      <NavBtn>
        <Link to='/main' onClick={() => setActiveMenu("main")}>
          <Main $active={activeMenu === "main"}>
            <FiHome size='24' /> &nbsp; 홈
          </Main>
        </Link>

        <Link to='/todo' onClick={() => setActiveMenu("todo")}>
          <Todo $active={activeMenu === "todo"}>
            <BsCardChecklist size='24' />
            &nbsp; 오늘의 할 일
          </Todo>
        </Link>

        <Link to='/calendar' onClick={() => setActiveMenu("calendar")}>
          <Cal $active={activeMenu === "calendar"}>
            <BsCalendarDate size='22' />
            &nbsp; 나의 캘린더
          </Cal>
        </Link>

        <Link to='/event' onClick={() => setActiveMenu("event")}>
          <Fam $active={activeMenu === "event"}>
            <TbReportMoney size='24' />
            &nbsp; 경조사 기록
          </Fam>
        </Link>

        <Link to='/chat' onClick={() => setActiveMenu("chat")}>
          <Talk $active={activeMenu === "chat"}>
            <BiMessageDetail size='23' />
            &nbsp; 대화하기
          </Talk>
        </Link>

        <Link to='/mypage' onClick={() => setActiveMenu("mypage")}>
          <Mypage $active={activeMenu === "mypage"}>마이페이지</Mypage>
        </Link>

        <Dark>
          <FaToggleOn size='30' color='#293642' />
          {/* <FaToggleOff /> */}
          &nbsp; Dark OFF
        </Dark>

        {isLogin ? (
          <Log onClick={logout}>로그아웃</Log>
        ) : (
          <Link to='/login'>
            <Log>로그인</Log>
          </Link>
        )}
      </NavBtn>
    </Wrap>
  );
}

export default NaviBar;
