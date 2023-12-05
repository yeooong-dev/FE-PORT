import { Cookies } from "react-cookie";
import { useUserContext } from "../components/navigation/userContext";

const UseLogout = () => {
  const cookies = new Cookies();
  const { dispatch } = useUserContext();

  const forceLogout = () => {
    cookies.remove("authorization");
    dispatch({
      type: "SET_USER",
      payload: {
        name: "",
        profileImage: "",
      },
    });
    window.location.href = "/login";
  };

  const logout = () => {
    forceLogout();
  };

  return { logout, forceLogout };
};

export default UseLogout;
