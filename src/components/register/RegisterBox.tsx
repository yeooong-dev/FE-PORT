import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../wrapper/StWrapper";
import {
  AuthContent,
  AuthWrap,
  EmailBox,
  EmailCheck,
  EmailInput,
  NameInput,
  PwConfilmInput,
  PwInput,
  RegisterBtn,
} from "./StRegister";
import useInput from "../../hook/UseInput";
import { register, usercheckEmail } from "../../api/auth";
import { useState } from "react";

function Register() {
  const [emailValue, setEmailValue] = useInput();
  const [nameValue, setNameValue] = useInput();
  const [pwValue, setPwValue] = useInput();
  const [pwconfirmValue, setPwConfirmValue] = useInput();

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [pwMessage, setPwMessage] = useState<string | null>(null);
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string | null>(null);

  // 이메일 중복 확인
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const VALID_EMAIL_MESSAGE = "올바른 이메일 형식입니다.";
  const VALID_NAME_MESSAGE = "맞게 작성하셨습니다.";
  const VALID_PASSWORD_MESSAGE = "올바른 비밀번호 형식입니다.";
  const VALID_PW_CONFIRM_MESSAGE = "비밀번호와 동일하게 입력하셨습니다.";

  const navigate = useNavigate();

  // email 형식
  const emailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (regExp.test(e.target.value)) {
      setEmailMessage(VALID_EMAIL_MESSAGE);
    } else {
      setEmailMessage("올바른 이메일 형식으로 입력바랍니다.");
    }
  };

  // 성함 길이(2~6)
  const nameValidation = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nameLength = e.target.value.length;

    if (nameLength >= 2 && nameLength <= 6) {
      setNameMessage(VALID_NAME_MESSAGE);
    } else {
      setNameMessage("2글자 이상 6글자 이하로 입력바랍니다.");
    }
  };

  // 비밀번호 유효성 검사 : 대소문자, 특수문자, 숫자만 입력 가능, 8~15 글자
  const pwValidation = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$/;

    const password = e.target.value;

    const hasKorean = /[\uAC00-\uD7A3]/;

    // 한글 포함 체크
    if (hasKorean.test(password)) {
      setPwMessage("한글은 포함될 수 없습니다.");
      return;
    }

    // 정규식 조건 체크
    if (regExp.test(password)) {
      setPwMessage(VALID_PASSWORD_MESSAGE);
    } else {
      setPwMessage(
        "8~15글자 이내의 영문, 숫자, 특수문자가 필수로 포함된 비밀번호를 입력바랍니다."
      );
    }
  };

  // 비밀번호 확인 유효성 검사
  const pwConfirmValidation = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.value === pwValue) {
      setPwConfirmMessage(VALID_PW_CONFIRM_MESSAGE);
    } else {
      setPwConfirmMessage("암호를 다시 확인하세요.");
    }
  };

  // 이메일 중복 확인
  const checkEmail = (): void => {
    usercheckEmail(emailValue)
      .then((res) => {
        alert("사용 가능한 이메일입니다.");
        // 중복 확인 완료됨
        setIsEmailChecked(true);
      })
      .catch((err) => {
        console.log(err);
        alert("중복된 이메일입니다.");
        // 중복 확인 완료 안됨
        setIsEmailChecked(false);
        return err;
      });
  };

  // 회원가입
  const onClickRegisterBtn = () => {
    if (!emailValue || !nameValue || !pwValue || !pwconfirmValue) {
      alert("전체 입력 바랍니다.");
      return;
    }

    if (
      emailMessage !== VALID_EMAIL_MESSAGE ||
      nameMessage !== VALID_NAME_MESSAGE ||
      pwMessage !== VALID_PASSWORD_MESSAGE ||
      pwConfirmMessage !== VALID_PW_CONFIRM_MESSAGE
    ) {
      alert("모든 항목이 올바르게 입력되지 않았습니다.");
      return;
    }

    if (!isEmailChecked) {
      alert("이메일 중복 확인 바랍니다.");
      return;
    }

    // 회원가입 요청
    register({
      email: emailValue,
      name: nameValue,
      password: pwValue,
    })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch((error) => {
        alert("회원가입에 실패하였습니다. 다시 시도해 주세요.");
      });
  };

  return (
    <AuthWrap>
      <AuthContent>
        <Link to='/'>
          <Logo>PORT</Logo>
        </Link>
        <EmailBox>
          <EmailInput
            type='text'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmailValue(e);
              emailValidation(e);
            }}
            value={emailValue || ""}
            placeholder='이메일을 입력해주세요.'
          />

          <EmailCheck onClick={checkEmail}>중복 확인</EmailCheck>
        </EmailBox>
        <div
          style={{
            color: emailMessage === VALID_EMAIL_MESSAGE ? "green" : "red",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {emailMessage}
        </div>

        <NameInput
          type='text'
          value={nameValue || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameValue(e);
            nameValidation(e);
          }}
          placeholder='성함을 입력해주세요.'
        />
        <div
          style={{
            color: nameMessage === VALID_NAME_MESSAGE ? "green" : "red",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {nameMessage}
        </div>

        <PwInput
          type='password'
          value={pwValue || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwValue(e);
            pwValidation(e);
          }}
          placeholder='비밀번호를 입력해주세요.'
        />
        <div
          style={{
            color: pwMessage === VALID_PASSWORD_MESSAGE ? "green" : "red",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          {pwMessage}
        </div>

        <PwConfilmInput
          type='password'
          value={pwconfirmValue || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPwConfirmValue(e);
            pwConfirmValidation(e);
          }}
          placeholder='비밀번호를 다시 입력해주세요.'
        />
        <div
          style={{
            color:
              pwConfirmMessage === VALID_PW_CONFIRM_MESSAGE ? "green" : "red",
            marginBottom: "20px",
          }}
        >
          {pwConfirmMessage}
        </div>
        <RegisterBtn
          onClick={() => {
            onClickRegisterBtn();
          }}
        >
          회원가입
        </RegisterBtn>
      </AuthContent>
    </AuthWrap>
  );
}

export default Register;
