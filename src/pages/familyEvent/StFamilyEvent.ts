import styled from "styled-components";

interface darkProps {
  darkMode: boolean;
}

export const Title = styled.h1`
  width: 55%;
  margin-bottom: 20px;
  color: #5d5b66;
  font-family: var(--font-title);
  font-size: 1.5rem;
  display: flex;
  align-items: flex-start;
  padding-left: 2rem;
`;

export const FamilyEventWrap = styled.div<darkProps>`
  width: 55%;
  height: 750px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#323336" : "white")};
  border-radius: 5px;
`;

export const InputBox = styled.div`
  width: 80%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Target = styled.input`
  width: 80%;
  height: 35px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 1rem;
`;

export const Date = styled.input`
  width: 80%;
  height: 35px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 1rem;
`;

export const Type = styled.input`
  width: 80%;
  height: 35px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 1rem;
`;

export const Amount = styled.input`
  width: 80%;
  height: 35px;
  background: #f0f0f0;
  padding: 1rem;
  font-size: 1rem;
`;

export const BtnBox = styled.div`
  width: 80%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -150px;

  .add {
    width: 40%;
    height: 60px;
    background: #51439d;
    color: white;
    font-size: 1.2rem;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      background: none;
      border: 3px solid #6f679e;
      transition: 0.5s;
      color: #51439d;
    }
  }

  .get {
    width: 40%;
    height: 60px;
    background: #51439d;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      background: none;
      border: 3px solid #6f679e;
      transition: 0.5s;
      color: #51439d;
    }
  }
`;
