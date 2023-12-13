import { styled } from "styled-components";

export const EmailInputLogin = styled.input`
  width: 380px;
  height: 55px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
  margin-top: 35px;
  margin-bottom: 15px;
  padding-left: 2rem;
`;

export const PwInputLogin = styled.input`
  width: 380px;
  height: 55px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
  margin-bottom: 20px;
  padding-left: 2rem;
`;

export const LoginBtn = styled.button`
  width: 410px;
  height: 55px;
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
`;
