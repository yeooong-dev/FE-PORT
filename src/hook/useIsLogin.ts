import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

const useIsLogin = (login: boolean = false) => {
  const [isLogin, setIsLogin] = useState(login);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("authorization")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setLoading(false);
  }, []);

  return [isLogin, loading];
};

export default useIsLogin;
