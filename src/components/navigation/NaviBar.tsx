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
  Wrap,
  Log,
} from "./StNavibar";
import { FiHome } from "react-icons/fi";
import { LuListTodo, LuUser } from "react-icons/lu";
import { RiCalendarCheckFill } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import useIsLogin from "../../hook/UseIsLogin";
import UseLogout from "../../hook/UseLogout";
import { useEffect, useState } from "react";
import { Logo } from "../wrapper/StWrapper";
import { useUserContext } from "./userContext";
import CustomConfirm from "../alert/CustomConfirm";
import useUser from "../../hook/UseUser";
import { imgGet } from "../../api/mypage";
import { useDarkMode } from "../darkmode/DarkModeContext";
import { ImExit } from "react-icons/im";

interface NaviBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NaviBar({ isSidebarOpen, setIsSidebarOpen }: NaviBarProps) {
  const [isLogin] = useIsLogin();
  const { logout } = UseLogout();
  const [activeMenu, setActiveMenu] = useState("main");
  const [width, setWidth] = useState("180px");
  const [showConfirm, setShowConfirm] = useState(false);
  const { state, updateUserContext } = useUserContext();
  const location = useLocation();
  const [profileImageUrl, setProfileImageUrl] = useState("/person.png");
  const { user, setUser } = useUser();
  const [displayName, setDisplayName] = useState("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", isSidebarOpen.toString());
  }, [isSidebarOpen]);

  useEffect(() => {
    const storedIsSidebarOpen = localStorage.getItem("isSidebarOpen");
    setIsSidebarOpen(
      storedIsSidebarOpen !== null ? storedIsSidebarOpen === "true" : true
    );
  }, []);

  useEffect(() => {
    setWidth(isSidebarOpen ? "180px" : "60px");
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isLogin && user?.id) {
      imgGet(user.id)
        .then((response) => {
          setProfileImageUrl(response.data.imageUrl);
          updateUserContext({
            name: user.name,
            profileImage: response.data.imageUrl,
          });
        })
        .catch((error) => {
          console.error("프로필 이미지 가져오기 실패:", error);
          setProfileImageUrl("/person.png");
        });
    } else {
      setProfileImageUrl("/person.png");
    }
  }, [isLogin, user?.id, updateUserContext]);

  useEffect(() => {
    setDisplayName(state.name);
    setProfileImageUrl(state.profileImage || "/person.png");
  }, [state]);

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

  const handleLogout = async () => {
    await logout();
    handleCancel();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const refreshPage = () => {
    if (location.pathname === "/main") {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrap isSidebarOpen={isSidebarOpen} darkMode={darkMode}>
      {isSidebarOpen && (
        <>
          <Link to='/main' onClick={refreshPage}>
            <Logo darkMode={darkMode}>PORT</Logo>
          </Link>

          <ProfileImg
            src={profileImageUrl}
            className='p_img'
            alt='프로필 이미지'
          />

          <Ment darkMode={darkMode} isSidebarOpen={isSidebarOpen}>
            {displayName}
          </Ment>
        </>
      )}

      <NavBtn>
        <Link to='/main' onClick={() => setActiveMenu("main")}>
          <Main $active={activeMenu === "main"} isSidebarOpen={isSidebarOpen}>
            <div>
              <FiHome size='25' />
              {isSidebarOpen && <span>&nbsp; 홈</span>}
            </div>
          </Main>
        </Link>

        <Link to='/todo' onClick={() => setActiveMenu("todo")}>
          <Todo $active={activeMenu === "todo"} isSidebarOpen={isSidebarOpen}>
            <div>
              <LuListTodo size='25' />
              {isSidebarOpen && <span>&nbsp; 오늘의 할 일</span>}
            </div>
          </Todo>
        </Link>

        <Link to='/calendar' onClick={() => setActiveMenu("calendar")}>
          <Cal
            $active={activeMenu === "calendar"}
            isSidebarOpen={isSidebarOpen}
          >
            <div>
              <RiCalendarCheckFill size='25' />
              {isSidebarOpen && <span>&nbsp; 나의 캘린더</span>}
            </div>
          </Cal>
        </Link>

        <Link
          to='/event'
          onClick={() => setActiveMenu("event")}
          style={{ width }}
        >
          <Fam $active={activeMenu === "event"} isSidebarOpen={isSidebarOpen}>
            <div>
              <TbReportMoney size='25' />
              {isSidebarOpen && <span>&nbsp; 경조사 기록</span>}
            </div>
          </Fam>
        </Link>

        <Link
          to='/chat'
          onClick={() => setActiveMenu("chat")}
          style={{ width }}
        >
          <Talk $active={activeMenu === "chat"} isSidebarOpen={isSidebarOpen}>
            <div>
              <BiMessageDetail size='25' />
              {isSidebarOpen && <span>&nbsp; 대화하기</span>}
            </div>
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
            <div>
              <LuUser size='25' />
              {isSidebarOpen && <span>&nbsp; 마이페이지</span>}
            </div>
          </Mypage>
        </Link>

        {isLogin ? (
          <>
            <Log
              onClick={() => setShowConfirm(true)}
              darkMode={darkMode}
              isSidebarOpen={isSidebarOpen}
            >
              <ImExit size='20' />
              {isSidebarOpen && <span>&nbsp;로그아웃</span>}
            </Log>
            {showConfirm && (
              <CustomConfirm
                message='로그아웃하시겠습니까?'
                onConfirm={handleLogout}
                onCancel={handleCancel}
              />
            )}
          </>
        ) : (
          <Link to='/login'>
            <Log darkMode={darkMode} isSidebarOpen={isSidebarOpen}>
              {isSidebarOpen ? <span>&nbsp;로그인</span> : <ImExit size='20' />}
            </Log>
          </Link>
        )}
      </NavBtn>
    </Wrap>
  );
}

export default NaviBar;
