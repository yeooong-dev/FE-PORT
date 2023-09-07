import { useEffect } from "react";
import useIsLogin from "../../hook/useIsLogin";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLogin] = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin]);

  return <></>;
};

export default Register;
