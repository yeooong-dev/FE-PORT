import { Link, useNavigate } from "react-router-dom";
import { AuthContent, AuthWrap } from "../../components/register/StRegister";
import { Logo } from "../../components/wrapper/StWrapper";
import { EmailInputLogin, LoginBtn, PwInputLogin } from "./StLogin";
import useInput from "../../hook/UseInput";
import { useCookies } from "react-cookie";
import { login } from "../../api/auth";
import { useUserContext } from "../../components/navigation/userContext";

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

  const onClickLoginBtn = () => {
    if (!emailValue || !pwValue) {
      alert("이메일과 비밀번호를 입력바랍니다.");
    }

    login({ email: emailValue, password: pwValue })
      .then((res) => {
        const authId = res.data.token;
        setCookie("authorization", "Bearer " + authId);
        setCookie("userEmail", emailValue);

        dispatch({
          type: "SET_USER",
          payload: {
            name: res.data.user.name,
            profileImage: res.data.user.profile_image,
          },
        });

        alert("로그인이 완료되었습니다.");
        navigate("/main");
      })
      .catch((err) => {
        if (err.response) {
          // 서버가 응답을 제공한 경우, 에러 메시지를 alert로 표시
          console.error("Server response:", err.response.data);
          alert(err.response.data.message);
        } else if (err.request) {
          // 요청이 보내졌으나 응답을 받지 못한 경우
          console.error("No response received:", err.request);
        } else {
          // 요청을 만드는 동안 오류가 발생한 경우
          console.error("Error creating request:", err.message);
        }
      });
  };

  return (
    <>
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
