import { Link } from "react-router-dom";
import { Logo } from "../../components/wrapper/StWrapper";
import {
    AuthContent,
    AuthWrap,
    EmailCheck,
    EmailInput,
    NameInput,
    NicknameCheck,
    NicknameInput,
    PwConfilmInput,
    PwInput,
    RegisterBtn,
} from "./StRegister";

function Register() {
    return (
        <AuthWrap>
            <AuthContent>
                <Link to='/main'>
                    <Logo>PORT</Logo>
                </Link>
                <div>
                    <EmailInput placeholder='이메일을 입력해주세요.' />
                    <EmailCheck>중복 확인</EmailCheck>
                </div>

                <div>
                    <NicknameInput placeholder='닉네임을 입력해주세요.' />
                    <NicknameCheck>중복 확인</NicknameCheck>
                </div>

                <NameInput placeholder='성함을 입력해주세요.' />
                <PwInput placeholder='비밀번호를 입력해주세요.' />
                <PwConfilmInput placeholder='비밀번호를 다시 입력해주세요.' />
                <RegisterBtn>회원가입</RegisterBtn>
            </AuthContent>
        </AuthWrap>
    );
}

export default Register;
