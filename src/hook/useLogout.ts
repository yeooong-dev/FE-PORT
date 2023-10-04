import { Cookies } from "react-cookie";
import { useUserContext } from "../components/navigation/userContext";

const UseLogout = () => {
  const cookies = new Cookies();
  const { dispatch } = useUserContext();

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      cookies.remove("authorization");

      dispatch({
        type: "SET_USER",
        payload: {
          name: "",
          profileImage: "",
        },
      });
      // localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return logout;
};

export default UseLogout;
