import { styled } from "styled-components";

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
  width: 600px;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  vertical-align: middle;
  background: #fff;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 7px 1px #cacdd5;
  box-shadow: 3px 3px 7px 1px #cacdd5;
`;

export const EmailBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  margin-top: 35px;
`;

export const EmailInput = styled.input`
  margin-right: 10px;
  width: 300px;
  height: 50px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
`;

export const EmailCheck = styled.button`
  width: 90px;
  height: 50px;
  font-size: 1rem;
  cursor: pointer;
  background: #e0e0e0;
`;

export const NameInput = styled.input`
  width: 400px;
  height: 50px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
`;

export const PwInput = styled.input`
  width: 400px;
  height: 50px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
`;

export const PwConfilmInput = styled.input`
  width: 400px;
  height: 50px;
  background: #f6f6f6;
  margin-bottom: 10px;
  padding-left: 1rem;
  font-size: 1rem;
`;

export const RegisterBtn = styled.button`
  width: 420px;
  height: 55px;
  margin-top: 10px;
  cursor: pointer;
  background: #51439d;
  color: white;
  font-size: 1.1rem;
`;
