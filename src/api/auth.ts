import axios from "axios";
import instance from "./instance";

// 이메일 중복 체크
export const usercheckEmail = async (email?: string) => {
    const value = { email: email };
    const response = await axios.post(`${process.env.REACT_APP_BE_SERVER}/auth/checkEmail`, value);
    return response;
};

// 일반 회원가입
export const register = async ({
    email,
    name,
    password,
    passwordConfirm,
}: {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
}) => {
    const response = await instance.post(`/auth/register`, {
        email,
        name,
        password,
        passwordConfirm,
    });
    return response;
};

// 기업 회원가입
export const registerCompany = async ({
    email,
    company_name,
    password,
    passwordConfirm,
}: {
    email: string;
    company_name: string;
    password: string;
    passwordConfirm: string;
}) => {
    const response = await instance.post(`/auth/registerCompany`, {
        email,
        company_name,
        password,
        passwordConfirm,
    });
    return response;
};

// 로그인
export const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await instance.post(`/auth/login`, { email, password });

    return response;
};
