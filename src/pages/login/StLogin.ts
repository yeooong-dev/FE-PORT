import { styled } from "styled-components";

export const EmailInputLogin = styled.input`
  width: 70%;
  max-width: 400px;
  height: 55px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
  margin-top: 35px;
  margin-bottom: 15px;
  padding-left: 2rem;

  @media (max-width: 550px) {
    height: 40px;
    font-size: 12px;
  }
`;

export const PwInputLogin = styled.input`
  width: 70%;
  max-width: 400px;
  height: 55px;
  background: #f6f6f6;
  padding-left: 1rem;
  font-size: 1rem;
  margin-bottom: 25px;
  padding-left: 2rem;

  @media (max-width: 550px) {
    height: 40px;
    font-size: 12px;
  }
`;

export const LoginBtn = styled.button`
  width: 73%;
  max-width: 430px;
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

  @media (max-width: 550px) {
    width: 80%;
    height: 40px;
    font-size: 14px;
  }
`;
