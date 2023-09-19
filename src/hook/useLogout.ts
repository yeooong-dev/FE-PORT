import { Cookies } from "react-cookie";

const useLogout = () => {
  const cookies = new Cookies();

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      cookies.remove("authorization");
      window.location.href = "/login";
    }
  };

  return logout;
};

export default useLogout;
