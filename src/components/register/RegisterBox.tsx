import { Link, useNavigate } from "react-router-dom";
import {
  AuthContent,
  AuthWrap,
  EmailBox,
  EmailCheck,
  EmailInput,
  Logo,
  NameInput,
  PwConfilmInput,
  PwInput,
  RegisterBtn,
} from "./StRegister";
import UseInput from "../../hook/UseInput"
import { register, usercheckEmail } from "../../api/auth";
import { useState } from "react";
import CustomAlert from "../alert/CustomAlert";

function Register() {
  const [emailValue, setEmailValue] = UseInput();
  const [nameValue, setNameValue] = UseInput();
  const [pwValue, setPwValue] = UseInput();
  const [pwconfirmValue, setPwConfirmValue] = UseInput();

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [pwMessage, setPwMessage] = useState<string | null>(null);
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string | null>(null);

  // 커스텀 알럿
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success">("error");

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
    const password = e.target.value;

    // 한글 포함 체크
    const hasKorean = /[\uAC00-\uD7A3]/;
    if (hasKorean.test(password)) {
      setPwMessage("한글은 포함될 수 없습니다.");
      return;
    }

    // 나머지 조건 (영문자, 숫자, 특수문자 포함, 길이 8~15글자):
    const passwordRegex =
      /^(?![\uAC00-\uD7A3]*$)(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

    if (passwordRegex.test(password)) {
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
    if (emailMessage !== VALID_EMAIL_MESSAGE) {
      setAlertType("error");
      setAlertMessage("올바른 이메일 형식으로 작성 후 중복 확인 바랍니다.");
      return;
    }

    usercheckEmail(emailValue)
      .then((res) => {
        setIsEmailChecked(true);
        setAlertType("success");
        setAlertMessage("사용 가능한 이메일입니다.");
      })
      .catch((err) => {
        console.log(err);
        setIsEmailChecked(false);
        setAlertType("error");
        setAlertMessage("중복된 이메일입니다.");
      });
  };

  // 회원가입
  const onClickRegisterBtn = () => {
    if (!emailValue || !nameValue || !pwValue || !pwconfirmValue) {
      setAlertType("error");
      setAlertMessage("전체 입력 바랍니다.");
      return;
    }

    if (
      emailMessage !== VALID_EMAIL_MESSAGE ||
      nameMessage !== VALID_NAME_MESSAGE ||
      pwMessage !== VALID_PASSWORD_MESSAGE ||
      pwConfirmMessage !== VALID_PW_CONFIRM_MESSAGE
    ) {
      setAlertType("error");
      setAlertMessage("모든 항목이 올바르게 입력되지 않았습니다.");
      return;
    }

    if (!isEmailChecked) {
      setAlertType("error");
      setAlertMessage("이메일 중복 확인 바랍니다");
      return;
    }

    // 회원가입 요청
    register({
      email: emailValue,
      name: nameValue,
      password: pwValue,
      passwordConfirm: pwconfirmValue,
    })
      .then((response) => {
        setAlertType("success");
        setAlertMessage("회원가입이 완료되었습니다.");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMessage("회원가입에 실패하였습니다. 다시 시도해 주세요.");
      });
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
              pwValidation(e);
              setPwValue(e);
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
              marginTop: "10px",
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
    </>
  );
}

export default Register;
