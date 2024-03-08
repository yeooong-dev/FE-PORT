import { Link, useNavigate } from "react-router-dom";
import { AuthContent, AuthWrap, Logo } from "../../components/register/StRegister";
import { EmailInputLogin, LoginBtn, PwInputLogin } from "./StLogin";
import UseInput from "../../hook/UseInput";
import { useCookies } from "react-cookie";
import { login } from "../../api/auth";
import { useUserContext } from "../../components/navigation/userContext";
import { useState } from "react";
import CustomAlert from "../../components/alert/CustomAlert";

function Login() {
    const [emailValue, setEmailValue] = UseInput();
    const [pwValue, setPwValue] = UseInput();
    const [cookies, setCookie] = useCookies(["authorization", "userEmail", "userName", "userImage"]);
    const { dispatch } = useUserContext();

    const navigate = useNavigate();

    // 커스텀 알럿
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"error" | "success">("error");

    const onClickLoginBtn = () => {
        if (!emailValue || !pwValue) {
            setAlertType("error");
            setAlertMessage("이메일과 비밀번호를 입력해 주세요.");
        } else {
            login({ email: emailValue, password: pwValue })
                .then((res) => {
                    if (res.status === 200) {
                        const { token, user } = res.data;
                        setCookie("authorization", "Bearer " + token, { path: "/" });
                        setCookie("userEmail", user.email, { path: "/" });
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                                name: user.name,
                                profileImage: user.profile_image,
                            })
                        );

                        dispatch({
                            type: "SET_USER",
                            payload: { name: user.name, profileImage: user.profile_image },
                        });

                        dispatch({
                            type: "SET_MODE",
                            payload: "IoMdPerson",
                        });

                        setAlertType("success");
                        setAlertMessage("로그인에 성공했습니다.");
                        setTimeout(() => {
                            navigate("/main");
                        }, 1000);
                    } else {
                        setAlertType("error");
                        setAlertMessage("로그인 처리 중 문제가 발생했습니다.");
                    }
                })
                .catch((err) => {
                    let errorMessage = "로그인 처리 중 문제가 발생했습니다.";
                    if (err.response && err.response.data && err.response.data.message) {
                        errorMessage = err.response.data.message;
                    }
                    setAlertType("error");
                    setAlertMessage(errorMessage);
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
                    <PwInputLogin type='password' value={pwValue} onChange={setPwValue} placeholder='비밀번호 입력' />
                    <LoginBtn onClick={onClickLoginBtn}>로그인</LoginBtn>
                    <Link to='/register' style={{ color: "#2e2e2e", fontSize: "1.1rem", fontWeight: "bold" }}>
                        회원가입
                    </Link>
                </AuthContent>
            </AuthWrap>
        </>
    );
}

export default Login;
