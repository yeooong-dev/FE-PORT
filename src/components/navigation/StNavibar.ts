import styled from "styled-components";

interface MainProps {
  $active: boolean;
  isSidebarOpen: boolean;
}

interface WrapProps {
  isSidebarOpen: boolean;
  darkMode: boolean;
}

interface MentProps {
  darkMode: boolean;
  isSidebarOpen: boolean;
}

export const Wrap = styled.div<WrapProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  transition: width 0.5s ease, margin-right 0.5s ease;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#323336" : "#f4f5fb")};
  margin-right: ${({ isSidebarOpen }) =>
    isSidebarOpen ? "0px" : "calc(100% - 80px)"};
  text-align: center;
  z-index: 99;
  padding-top: 100px;

  @media (max-width: 550px) {
    display: ${({ isSidebarOpen }) => (isSidebarOpen ? "flex" : "none")};
    padding-top: 50px;
  }

  @media (max-width: 320px) {
    padding-top: 30px;
  }
`;

export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 30px;
  border: 2px solid #abb5d4;
  padding: 2px;

  @media (max-width: 550px) {
    width: 60px;
    height: 60px;
  }
`;

export const Ment = styled.p<MentProps>`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};

  @media (max-width: 550px) {
    margin-bottom: 0;
    font-size: 18px;
  }
`;

export const Code = styled.p<MentProps>`
  margin-bottom: 20px;
  font-size: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};

  @media (max-width: 550px) {
    margin-bottom: 0;
    font-size: 18px;
  }
`;

export const NavBtn = styled.div`
  width: 70%;
  margin-top: 30px;
  color: #2a3642;
  cursor: pointer;
`;

export const Main = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};
  overflow: visible;

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Todo = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Cal = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Fam = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Talk = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 10px;
  }
`;

export const Mypage = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 100px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#3c57b3" : "none")};
  color: ${({ $active }) => ($active ? "white" : "#858585")};

  box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -webkit-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};
  -moz-box-shadow: ${({ $active }) =>
    $active ? "7px 7px 5px 0px rgba(0, 0, 0, 0.15)" : "none"};

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${({ isSidebarOpen }) =>
      isSidebarOpen ? "flex-start" : "center"};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "30px" : "0")};

    span {
      margin-left: 10px;
    }
  }

  &:hover {
    background: #3c57b3;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    height: 45px;
    margin-bottom: 50px;
  }
`;

export const Log = styled.li<MentProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "55px")};
  height: 100px;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#8f8f8f" : "#858585")};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    font-size: 14px;
    padding-top: 0px;
  }

  @media (max-width: 380px) {
    height: 50px;
  }

  @media (max-width: 320px) {
    height: 50px;
    align-items: flex-start;
  }
`;
