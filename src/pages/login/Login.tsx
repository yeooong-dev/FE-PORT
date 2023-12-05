import { Link, useNavigate } from "react-router-dom";
import {
  AuthContent,
  AuthWrap,
  Logo,
} from "../../components/register/StRegister";
import { EmailInputLogin, LoginBtn, PwInputLogin } from "./StLogin";
import useInput from "../../hook/UseInput";
import { useCookies } from "react-cookie";
import { login } from "../../api/auth";
import { useUserContext } from "../../components/navigation/userContext";
import { useState } from "react";
import CustomAlert from "../../components/alert/CustomAlert";

function Login() {
  const [emailValue, setEmailValue] = useInput();
  const [pwValue, setPwValue] = useInput();
  const [cookies, setCookie] = useCookies([
    "authorization",
    "userEmail",
    "userName",
    "userImage",
  ]);
  const { dispatch } = useUserContext();

  const navigate = useNavigate();

  // 커스텀 알럿
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success">("error");

  const onClickLoginBtn = () => {
    if (!emailValue || !pwValue) {
      setAlertType("error");
      setAlertMessage("이메일과 비밀번호를 입력바랍니다.");
    } else {
      login({ email: emailValue, password: pwValue })
        .then((res) => {
          const authId = res.data.token;
          const userData = {
            name: res.data.user.name,
            profileImage: res.data.user.profile_image,
          };
          setCookie("authorization", "Bearer " + authId);
          localStorage.setItem("user", JSON.stringify(userData));

          dispatch({
            type: "SET_USER",
            payload: userData,
          });

          setAlertType("success");
          setAlertMessage("로그인이 완료되었습니다.");

          setTimeout(() => {
            navigate("/main");
          }, 1000);
        })
        .catch((err) => {
          if (err.response) {
            // 서버가 응답을 제공한 경우, 에러 메시지를 alert로 표시
            console.error("Server response:", err.response.data);
            setAlertType("error");
            setAlertMessage(err.response.data.message);
          } else if (err.request) {
            // 요청이 보내졌으나 응답을 받지 못한 경우
            console.error("No response received:", err.request);
          } else {
            // 요청을 만드는 동안 오류가 발생한 경우
            console.error("Error creating request:", err.message);
          }
        });
    }
  };

  return (
    <>
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
      <AuthWrap>
        <AuthContent>
          <Link to='/'>
            <Logo>PORT</Logo>
          </Link>
          <EmailInputLogin
            type='text'
            value={emailValue}
            onChange={setEmailValue}
            placeholder='아이디 입력'
          />
          <PwInputLogin
            type='password'
            value={pwValue}
            onChange={setPwValue}
            placeholder='비밀번호 입력'
          />
          <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
          <Link to='/register' style={{ color: "black", fontSize: "1.1rem" }}>
            회원가입
          </Link>
        </AuthContent>
      </AuthWrap>
    </>
  );
}

export default Login;
