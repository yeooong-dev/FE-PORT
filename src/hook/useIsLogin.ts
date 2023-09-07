import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const useIsLogin = (login: boolean = false) => {
  const [isLogin, setIsLogin] = useState(login);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("authorization")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return [isLogin];
};

export default useIsLogin;
