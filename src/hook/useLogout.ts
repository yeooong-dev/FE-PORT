import { Cookies } from "react-cookie";

const useLogout = () => {
  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("authorization");

    window.location.href = "/login";
  };

  return logout;
};

export default useLogout;
