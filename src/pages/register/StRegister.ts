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
    width: 550px;
    height: 550px;
    display: flex;
    align-items: center;
    flex-direction: column;
    vertical-align: middle;
    background: #fff;
    border-radius: 20px;
    -webkit-box-shadow: 3px 3px 7px 1px #cacdd5;
    box-shadow: 3px 3px 7px 1px #cacdd5;
`;

export const EmailInput = styled.input`
    margin-right: 10px;
    width: 250px;
    height: 35px;
    margin-top: 50px;
    margin-bottom: 10px;
    padding-left: 1rem;
`;

export const EmailCheck = styled.button``;

export const NicknameInput = styled.input`
    margin-right: 10px;
    width: 250px;
    height: 35px;
    margin-bottom: 10px;
    padding-left: 1rem;
`;

export const NicknameCheck = styled.button``;

export const NameInput = styled.input`
    width: 312px;
    height: 35px;
    margin-bottom: 10px;
    padding-left: 1rem;
`;

export const PwInput = styled.input`
    width: 312px;
    height: 35px;
    margin-bottom: 10px;
    padding-left: 1rem;
`;

export const PwConfilmInput = styled.input`
    width: 312px;
    height: 35px;
    margin-bottom: 10px;
    padding-left: 1rem;
`;

export const RegisterBtn = styled.button`
    width: 333px;
    height: 40px;
    margin-top: 30px;
`;
