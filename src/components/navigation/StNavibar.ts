import styled from "styled-components";

interface MainProps {
  active: boolean;
}

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: white;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const Ment = styled.p``;

export const NavBtn = styled.div`
  margin-top: 30px;
  color: #2a3642;
  cursor: pointer;
`;

export const Mypage = styled.li`
  cursor: pointer;
  color: #51439d;
  margin: 5px;
  font-size: 1.1rem;
`;

export const Main = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Todo = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Cal = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Fam = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Vac = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Talk = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Dm = styled.button<MainProps>`
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 60px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#51449d" : "#f9f9f9")};
  color: ${({ active }) => (active ? "white" : "#51449d")};
`;

export const Dark = styled.li`
  width: 180px;
  height: 50px;
  padding-left: 0.2rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #51449d;
  font-weight: 900;
  cursor: pointer;
`;
