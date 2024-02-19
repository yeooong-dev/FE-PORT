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
import UseIsLogin from "../../hook/UseIsLogin";
import UseLogout from "../../hook/UseLogout";
import { useEffect, useState } from "react";
import { Logo } from "../wrapper/StWrapper";
import { useUserContext } from "./userContext";
import CustomConfirm from "../alert/CustomConfirm";
import UseUser from "../../hook/UseUser";
import { imgGet } from "../../api/mypage";
import { useDarkMode } from "../darkmode/DarkModeContext";
import { ImExit } from "react-icons/im";
import { LuUserCheck2 } from "react-icons/lu";
import { PiBuildingsFill } from "react-icons/pi";
import { PiAddressBook } from "react-icons/pi";
import CustomAlert from "../../components/alert/CustomAlert";

interface NaviBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "FaPeopleGroup" | "IoMdPerson";
}

function NaviBar({ isSidebarOpen, setIsSidebarOpen, mode }: NaviBarProps) {
  const [isLogin] = UseIsLogin();
  const { logout } = UseLogout();
  const [activeMenu, setActiveMenu] = useState("main");
  const [width, setWidth] = useState("180px");
  const [showConfirm, setShowConfirm] = useState(false);
  const { state, updateUserContext } = useUserContext();
  const location = useLocation();
  const [profileImageUrl, setProfileImageUrl] = useState("/person.png");
  const { user } = UseUser();
  const [displayName, setDisplayName] = useState("");
  const { darkMode } = useDarkMode();
  // 커스텀 알럿
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success">("error");

  // 기업 페이지 접근 권한 확인
  const hasAccessToCompanyPage = user && user.isCompany;

  // 조직도 및 연차 신청 페이지 접근 권한 확인
  const hasAccessToOrganizationChart =
    user && (user.isEmployeeRegistered || user.company_code);
  const hasAccessToVacationRequest =
    user && (user.isEmployeeRegistered || user.company_code);

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
    if (user) {
      const nameToDisplay = user.company_name ? user.company_name : user.name;
      setDisplayName(nameToDisplay);
    } else {
      setDisplayName("");
    }
  }, [user]);

  useEffect(() => {
    if (isLogin && user?.id) {
      imgGet(user.id)
        .then((response) => {
          setProfileImageUrl(response.data.imageUrl);
          updateUserContext({
            name: user.name,
            company_name: user.company_name || "",
            profileImage: response.data.imageUrl,
          });
        })
        .catch((error) => {
          console.error("프로필 이미지 가져오기 실패:", error);
          setProfileImageUrl("/profile.png");
        });
    } else {
      setProfileImageUrl("/profile.png");
    }
  }, [isLogin, user?.id, updateUserContext]);

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
      case "/vac":
        setActiveMenu("vac");
        break;
      case "/chat":
        setActiveMenu("chat");
        break;
      case "/mypage":
        setActiveMenu("mypage");
        break;
      case "/company":
        setActiveMenu("company");
        break;
      case "/chart":
        setActiveMenu("chart");
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

  useEffect(() => {
    setDisplayName(state.name || state.company_name);
    setProfileImageUrl(state.profileImage || "/profile.png");
  }, [state]);

  const handleChartPageAccess = () => {
    if (!hasAccessToOrganizationChart) {
      setAlertType("error");
      setAlertMessage("직원 등록 후 이용이 가능합니다.");
    }
  };

  const handleVacationPageAccess = () => {
    if (!hasAccessToVacationRequest) {
      setAlertType("error");
      setAlertMessage("직원 등록 후 이용이 가능합니다.");
    }
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 550) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Wrap isSidebarOpen={isSidebarOpen} darkMode={darkMode}>
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertMessage(null);
            setAlertType("error");
          }}
        />
      )}
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
        {mode === "IoMdPerson" && (
          <>
            <Link
              to='/main'
              onClick={() => {
                setActiveMenu("main");
                handleMenuClick();
              }}
            >
              <Main
                $active={activeMenu === "main"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <FiHome size='25' />
                  {isSidebarOpen && <span>&nbsp; 홈</span>}
                </div>
              </Main>
            </Link>

            <Link
              to='/todo'
              onClick={() => {
                setActiveMenu("todo");
                handleMenuClick();
              }}
            >
              <Todo
                $active={activeMenu === "todo"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <LuListTodo size='25' />
                  {isSidebarOpen && <span>&nbsp; 오늘의 할 일</span>}
                </div>
              </Todo>
            </Link>

            <Link
              to='/calendar'
              onClick={() => {
                setActiveMenu("calendar");
                handleMenuClick();
              }}
            >
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
              onClick={() => {
                setActiveMenu("event");
                handleMenuClick();
              }}
              style={{ width }}
            >
              <Fam
                $active={activeMenu === "event"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <TbReportMoney size='25' />
                  {isSidebarOpen && <span>&nbsp; 경조사 기록</span>}
                </div>
              </Fam>
            </Link>

            <Link
              to='/mypage'
              onClick={() => {
                setActiveMenu("mypage");
                handleMenuClick();
              }}
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
          </>
        )}

        {mode === "FaPeopleGroup" && (
          <>
            <Link
              to='/chat'
              onClick={() => {
                setActiveMenu("chat");
                handleMenuClick();
              }}
              style={{ width }}
            >
              <Talk
                $active={activeMenu === "chat"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <BiMessageDetail size='25' />
                  {isSidebarOpen && <span>&nbsp; 대화하기</span>}
                </div>
              </Talk>
            </Link>

            <Link
              to={hasAccessToOrganizationChart ? "/chart" : "#"}
              onClick={() => {
                setActiveMenu("handleChartPageAccess");
                handleMenuClick();
              }}
              style={{ width }}
            >
              <Talk
                $active={activeMenu === "chart"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <PiAddressBook size='25' />
                  {isSidebarOpen && <span>&nbsp; 조직도</span>}
                </div>
              </Talk>
            </Link>

            <Link
              to={hasAccessToVacationRequest ? "/vac" : "#"}
              onClick={() => {
                setActiveMenu("handleVacationPageAccess");
                handleMenuClick();
              }}
              style={{ width }}
            >
              <Fam $active={activeMenu === "vac"} isSidebarOpen={isSidebarOpen}>
                <div>
                  <LuUserCheck2 size='25' />
                  {isSidebarOpen && <span>&nbsp; 연차 신청</span>}
                </div>
              </Fam>
            </Link>

            <Link
              to='/company'
              onClick={(e) => {
                if (!hasAccessToCompanyPage) {
                  e.preventDefault();
                  setAlertType("error");
                  setAlertMessage("접근 권한이 없습니다.");
                } else {
                  setActiveMenu("company");
                  handleMenuClick();
                }
              }}
              style={{ width }}
            >
              <Talk
                $active={activeMenu === "company"}
                isSidebarOpen={isSidebarOpen}
              >
                <div>
                  <PiBuildingsFill size='25' />
                  {isSidebarOpen && <span>&nbsp; 기업페이지</span>}
                </div>
              </Talk>
            </Link>
          </>
        )}

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
