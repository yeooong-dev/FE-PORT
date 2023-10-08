import styled from "styled-components";

interface RightProps {
  isSidebarOpen: boolean;
}

export const Wrap = styled.div<{ darkMode: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ darkMode }) => (darkMode ? "#222327" : "#ebedf2")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
`;

export const Left = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Right = styled.div<RightProps>`
  width: ${(props) => (props.isSidebarOpen ? "80%" : "300%")};
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
`;

export const Contents = styled.div<{ darkMode: boolean }>`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ darkMode }) => (darkMode ? "#222327" : "#ebedf2")};
  text-align: center;
`;

export const Logo = styled.div<{ darkMode: boolean }>`
  font-size: 2.3rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#51449d")};
  font-family: var(--font-logo);
  cursor: pointer;
`;
