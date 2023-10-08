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
}

export const Wrap = styled.div<WrapProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "100px")};
  transition: width 0.3s ease, margin-right 0.3s ease;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#323336" : "#d7e0f7")};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-right: ${({ isSidebarOpen }) =>
    isSidebarOpen ? "0px" : "calc(100% - 100px)"};
  text-align: center;

  .open_btn {
    cursor: pointer;
    position: absolute;
    top: ${({ isSidebarOpen }) => (isSidebarOpen ? "2.8%" : "290px")};
    left: ${({ isSidebarOpen }) => (isSidebarOpen ? "15%" : "30px")};
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#665c9e")};
  }
`;

export const ProfileImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 30px;
`;

export const Ment = styled.p<MentProps>`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};
`;

export const NavBtn = styled.div`
  margin-top: 30px;
  color: #2a3642;
  cursor: pointer;
`;

export const Main = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};
  overflow: visible;

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Todo = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Cal = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Fam = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Talk = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Mypage = styled.button<MainProps>`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "100%" : "50px")};
  height: 50px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  overflow: visible;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 25px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
`;

export const Dark = styled.li<MentProps>`
  width: 170px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  font-size: 1.2rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};
  font-weight: 900;
  cursor: pointer;
`;

export const Log = styled.li<MentProps>`
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};
  text-align: center;
  margin-bottom: 20px;
`;
