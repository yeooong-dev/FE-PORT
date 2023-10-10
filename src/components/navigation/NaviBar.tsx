import { Link, useLocation } from "react-router-dom";
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
import { LuListTodo, LuUser } from "react-icons/lu";
import { RiCalendarCheckFill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import useIsLogin from "../../hook/UseIsLogin";
import UseLogout from "../../hook/UseLogout";
import { useEffect, useState } from "react";
import { Logo } from "../wrapper/StWrapper";
import { useUserContext } from "./userContext";
import { useDarkMode } from "../darkmode/DarkModeContext";

interface NaviBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NaviBar({ isSidebarOpen, setIsSidebarOpen }: NaviBarProps) {
  const [isLogin] = useIsLogin();
  const { logout } = UseLogout();
  const [activeMenu, setActiveMenu] = useState("main");
  const [width, setWidth] = useState("180px");

  const { state } = useUserContext();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const userProfileFromLocalStorage = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const imageUrl =
    userProfileFromLocalStorage.profileImage || state.profileImage;

  useEffect(() => {
    setWidth(isSidebarOpen ? "180px" : "60px");
  }, [isSidebarOpen]);

  useEffect(() => {
    switch (location.pathname) {
      case "/main":
        setActiveMenu("main");
        break;
      case "/todo":
        setActiveMenu("todo");
        break;
      case "/calendar":
        setActiveMenu("calendar");
        break;
      case "/event":
        setActiveMenu("event");
        break;
      case "/chat":
        setActiveMenu("chat");
        break;
      case "/mypage":
        setActiveMenu("mypage");
        break;
      default:
        setActiveMenu("main");
        break;
    }
  }, [location.pathname]);

  return (
    <Wrap isSidebarOpen={isSidebarOpen} darkMode={darkMode}>
      <div
        className='open_btn'
        onClick={() => {
          setIsSidebarOpen((prev) => !prev);
          setWidth((prev) => (prev === "180px" ? "60px" : "180px"));
        }}
      >
        {isSidebarOpen ? (
          <HiChevronDoubleLeft size='35' />
        ) : (
          <HiChevronDoubleRight size='35' />
        )}
      </div>

      {isSidebarOpen && (
        <>
          <Link to='/main'>
            <Logo darkMode={darkMode}>PORT</Logo>
          </Link>
          {state.profileImage ? (
            <ProfileImg src={imageUrl} className='p_img' alt='프로필 이미지' />
          ) : (
            <ProfileImg
              src='/person.png'
              className='p_img'
              alt='프로필 이미지'
            />
          )}
          <Ment darkMode={darkMode}>
            {state.name ? `${state.name}님 환영합니다.` : "환영합니다."}
          </Ment>
        </>
      )}

      <NavBtn>
        <Link to='/main' onClick={() => setActiveMenu("main")}>
          <Main $active={activeMenu === "main"} isSidebarOpen={isSidebarOpen}>
            <FiHome size='24' />
            {isSidebarOpen && (
              <span style={{ marginLeft: "10px" }}>&nbsp; 홈</span>
            )}
          </Main>
        </Link>

        <Link to='/todo' onClick={() => setActiveMenu("todo")}>
          <Todo $active={activeMenu === "todo"} isSidebarOpen={isSidebarOpen}>
            <LuListTodo size='25' />
            {isSidebarOpen && <span>&nbsp; 오늘의 할 일</span>}
          </Todo>
        </Link>

        <Link to='/calendar' onClick={() => setActiveMenu("calendar")}>
          <Cal
            $active={activeMenu === "calendar"}
            isSidebarOpen={isSidebarOpen}
          >
            <RiCalendarCheckFill size='23' />
            {isSidebarOpen && <span>&nbsp; 나의 캘린더</span>}
          </Cal>
        </Link>

        <Link
          to='/event'
          onClick={() => setActiveMenu("event")}
          style={{ width }}
        >
          <Fam $active={activeMenu === "event"} isSidebarOpen={isSidebarOpen}>
            <TbReportMoney size='25' />
            {isSidebarOpen && <span>&nbsp; 경조사 기록</span>}
          </Fam>
        </Link>

        <Link
          to='/chat'
          onClick={() => setActiveMenu("chat")}
          style={{ width }}
        >
          <Talk $active={activeMenu === "chat"} isSidebarOpen={isSidebarOpen}>
            <BiMessageDetail size='24' />
            {isSidebarOpen && <span>&nbsp; 대화하기</span>}
          </Talk>
        </Link>

        <Link
          to='/mypage'
          onClick={() => setActiveMenu("mypage")}
          style={{ width }}
        >
          <Mypage
            $active={activeMenu === "mypage"}
            isSidebarOpen={isSidebarOpen}
          >
            <LuUser size='25' />
            {isSidebarOpen && <span>&nbsp; 마이페이지</span>}
          </Mypage>
        </Link>

        {isSidebarOpen && (
          <>
            <Dark onClick={toggleDarkMode} darkMode={darkMode}>
              {darkMode ? (
                <FaToggleOn size='30' color='white' />
              ) : (
                <FaToggleOff size='30' color='#6c6594' />
              )}
              &nbsp; {darkMode ? "Dark ON" : "Dark OFF"}
            </Dark>

            {isLogin ? (
              <Log onClick={logout} darkMode={darkMode}>
                로그아웃
              </Log>
            ) : (
              <Link to='/login'>
                <Log darkMode={darkMode}>로그인</Log>
              </Link>
            )}
          </>
        )}
      </NavBtn>
    </Wrap>
  );
}

export default NaviBar;
