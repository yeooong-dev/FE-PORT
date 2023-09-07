import { Link, useNavigate } from "react-router-dom";
import { AuthContent, AuthWrap } from "../../components/register/StRegister";
import { Logo } from "../../components/wrapper/StWrapper";
import { EmailInputLogin, LoginBtn, PwInputLogin } from "./StLogin";
import useInput from "../../hook/useInput";
import { useCookies } from "react-cookie";
import { login } from "../../api/auth";

function Login() {
  const [emailValue, setEmailValue] = useInput();
  const [pwValue, setPwValue] = useInput();
  const [cookies, setCookie] = useCookies(["authorization"]);

  const navigate = useNavigate();

  const onClickLoginBtn = () => {
    if (!emailValue || !pwValue) {
      alert("이메일과 비밀번호를 입력바랍니다.");
    }

    login({ email: emailValue, pw: pwValue })
      .then((res) => {
        const authId = res.data.Authorization;
        setCookie("authorization", "Bearer" + authId);
        alert("로그인이 완료되었습니다.");
        navigate("/main");
      })
      .catch((err) => {
        alert(err.response.data.message || "다시 입력해주세요.");
        console.log(err);
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
