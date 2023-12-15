import { css, keyframes, styled } from "styled-components";

interface SearchInputProps {
  darkMode: boolean;
  visible: boolean;
  isSidebarOpen: boolean;
}

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const SearchWrap = styled.div<SearchInputProps>`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  top: 0;
  background: ${({ darkMode }) => (darkMode ? "#323336" : "#f4f5fb")};

  .open_btn {
    cursor: pointer;
    position: absolute;
    left: 0px;
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#666666")};
  }
`;

export const Dark = styled.li<SearchInputProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  font-size: 1.2rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};
  font-weight: 900;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 60px;
  transform: translate(0, -50%);
  border: 1.5px solid #e8d1b0;
  border-radius: 10px;

  &:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    width: 30px;
    height: 30px;
    left: 50px;
  }

  @media (max-width: 320px) {
    left: 46px;
  }
`;

export const SearchRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  right: 60px;

  @media (max-width: 860px) {
    right: 30px;
  }
`;

export const Action = styled.div<SearchInputProps>`
  display: block;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  animation: ${({ visible }) =>
    visible
      ? css`
          ${slideInAnimation} 0.5s ease forwards
        `
      : css`
          ${slideOutAnimation} 0.5s ease forwards
        `};
`;

export const SearchInput = styled.input<SearchInputProps>`
  width: 200px;
  height: 35px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 2px solid #ededed;
  padding-left: 1rem;
  margin-left: 0px;
  overflow: hidden;
  font-size: 1rem;
  position: relative;
  z-index: 999;

  @media (max-width: 790px) {
    width: 150px;
  }

  @media (max-width: 550px) {
    width: 100px;
  }

  @media (max-width: 320px) {
    width: 80px;
  }
`;

export const SearchBtn = styled.button<SearchInputProps>`
  width: 40px;
  height: 20px;
  border: none;
  background: none;
  margin-bottom: 8px;
  cursor: pointer;
  padding-right: 0px;

  .icon {
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#666666")};
  }

  &:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    padding-right: 0px;
  }
`;

export const Search = styled.button<{ darkMode: boolean }>`
  width: 70px;
  height: 38px;
  cursor: pointer;
  background: #3c57b3;
  color: white;
  font-size: 1rem;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-right: 0px;

  animation: ${({ darkMode }) =>
    darkMode
      ? css`
          ${slideInAnimation} 0.2s ease forwards
        `
      : "none"};

  @media (max-width: 550px) {
    width: 45px;
    font-size: 14px;
    margin-right: -30px;
  }
`;

export const ResultWrap = styled.div<{ darkMode: boolean }>`
  width: 80%;
  height: 75vh;
  max-width: 800px;
  overflow-x: hidden;
  overflow-y: auto;

  .highlight {
    background: ${({ darkMode }) => (darkMode ? "#3c5699" : "#c7d7ff")};
  }

  div {
    width: 100%;
    border: ${({ darkMode }) =>
      darkMode ? "1.5px solid #696969" : "1.5px solid #d6d6d6"};
    margin-bottom: 20px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f9f9f9")};
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }

  div:hover {
    background: ${({ darkMode }) => (darkMode ? "#575757" : "#e4e6ed")};
    cursor: pointer;
    transition: 0.3s;
  }

  b {
    font-weight: bold;
    padding-top: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    border-bottom: ${({ darkMode }) =>
      darkMode ? "1.5px solid #ccdaff" : "1.5px solid #3c57b3"};
    color: ${({ darkMode }) => (darkMode ? "#ccdaff" : "#3c57b3")};
  }

  span {
    margin-bottom: 20px;
    width: 80%;
  }

  .title {
    font-size: 1.2rem;
  }

  .clear {
    font-size: 16px;
  }

  .none {
    margin-top: 50px;
    font-size: 1.1rem;
  }

  .date {
    color: #8f8f8f;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 25px;
  }

  .last {
    margin-bottom: 10px;
  }

  @media (max-width: 550px) {
    div:hover {
      background: ${({ darkMode }) => (darkMode ? "#323336" : "#f9f9f9")};
    }

    .title {
      font-size: 1rem;
    }
  }
`;
