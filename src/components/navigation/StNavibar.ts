import styled from "styled-components";

interface MainProps {
  $active: boolean;
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  margin: 30px;
`;

export const Ment = styled.p`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: #293642;
`;

export const NavBtn = styled.div`
  margin-top: 30px;
  color: #2a3642;
  cursor: pointer;
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
  font-size: 1rem;
  background: ${({ $active }) => ($active ? "#51449d" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#51449d")};

  &:hover {
    background: #51449d;
    color: white;
    transition: 0.3s;
  }
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
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
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
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
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
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
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
  width: 180px;
  height: 50px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
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

export const Dark = styled.li`
  width: 170px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  font-size: 1.2rem;
  color: #293642;
  font-weight: 900;
  cursor: pointer;
`;

export const Log = styled.li`
  cursor: pointer;
  font-size: 1.2rem;
  color: #293642;
  text-align: center;
  margin-bottom: 20px;
`;
