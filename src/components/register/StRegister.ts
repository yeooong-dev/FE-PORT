import { styled } from "styled-components";

interface ValidEmailMessageProps {
  valid: boolean;
}

export const Logo = styled.div`
  font-size: 2.3rem;
  color: #3c57b3;
  font-family: var(--font-logo);
  cursor: pointer;

  @media (max-width: 550px) {
    font-size: 2rem;
  }
`;

export const AuthWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8ecf5;
`;

export const AuthContent = styled.div`
  width: 80%;
  max-width: 650px;
  min-width: 270px;
  height: 80vh;
  max-height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle;
  background: #fff;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 7px 1px #cacdd5;
  box-shadow: 3px 3px 7px 1px #cacdd5;

  .or {
    button {
      cursor: pointer;
      padding: 8px;
      margin-top: 20px;
    }
  }

  @media (max-width: 550px) {
    .or {
      button {
        font-size: 11px;
        padding: 6px;
        margin-top: 15px;
      }
    }
  }
`;

export const EmailBox = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  margin-top: 30px;

  @media (max-width: 550px) {
    width: 100%;
    max-width: 320px;
    margin-top: 20px;
  }

  @media (max-width: 400px) {
    width: 90%;
  }

  @media (max-width: 375px) {
    max-width: 280px;
    width: 92%;
  }

  @media (max-width: 350px) {
    max-width: 250px;
    width: 87%;
  }
`;

export const EmailInput = styled.input`
  margin-right: 10px;
  width: 60%;
  max-width: 400px;
  height: 45px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;

  @media (max-width: 550px) {
    width: 50%;
    height: 30px;
    font-size: 12px;
    margin-bottom: -5px;
  }
`;

export const EmailCheck = styled.button`
  width: 90px;
  height: 45px;
  font-size: 1rem;
  cursor: pointer;
  background: #e0e0e0;

  @media (max-width: 550px) {
    width: 60px;
    height: 30px;
    font-size: 12px;
    margin-bottom: -5px;
  }
`;

export const NameInput = styled.input`
  width: 70%;
  max-width: 400px;
  height: 45px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;

  @media (max-width: 550px) {
    height: 30px;
    font-size: 12px;
    margin-bottom: -5px;
  }
`;

export const PwInput = styled.input`
  width: 70%;
  max-width: 400px;
  height: 45px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;

  @media (max-width: 550px) {
    height: 30px;
    font-size: 12px;
    margin-bottom: -5px;
  }
`;

export const PwConfilmInput = styled.input`
  width: 70%;
  max-width: 400px;
  height: 45px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;

  @media (max-width: 550px) {
    height: 30px;
    font-size: 12px;
    margin-bottom: -5px;
  }
`;

export const RegisterBtn = styled.button`
  width: 73%;
  max-width: 420px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  cursor: pointer;
  background: #3c57b3;
  color: white;
  font-size: 1.1rem;

  &:hover {
    background: none;
    color: #3c57b3;
    font-weight: bold;
    border: 2px solid #bcc5e0;
    transition: 0.2s;
  }

  @media (max-width: 550px) {
    width: 76%;
    height: 35px;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;

    &:hover {
      background: #3c57b3;
      color: white;
      font-weight: 400;
      border: none;
    }
  }
`;

export const ValidMessage = styled.div<ValidEmailMessageProps>`
  color: ${(props) => (props.valid ? "green" : "red")};
  margin-top: 10px;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    width: 80%;
    font-size: 12px;
    margin-bottom: 15px;
    text-align: center;
  }
`;
