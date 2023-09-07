import axios from "axios";
import instance from "./instance";

// 회원가입
export const register = async ({
  email,
  pw,
}: {
  email: string;
  pw: string;
}) => {
  const response = await instance.post(`/user`, { email, pw });
  console.log(response);
  return response;
};

// 이메일 중복 체크
export const usercheckEmail = async (email?: string) => {
  const value = { email: email };
  const response = await axios.post(
    `${process.env.REACT_APP_BE_SERVER}/api/auth/emailCheck`,
    value
  );
  return response;
};

// 로그인
export const login = async ({ email, pw }: { email: string; pw: string }) => {
  const response = await instance.post(`/login`, { email, pw });
  console.log(response);
  return response;
};
