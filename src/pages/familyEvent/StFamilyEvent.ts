import styled from "styled-components";

interface darkProps {
  darkMode: boolean;
}

export const Title = styled.h1<darkProps>`
  color: ${({ darkMode }) => (darkMode ? "#d4d4d4" : "#5d5b66")};
  font-family: var(--font-title);
  font-size: 1.3rem;
  margin-bottom: 30px;
`;

export const FamilyEventWrap = styled.div<darkProps>`
  width: 90%;
  height: auto;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
  border-radius: 5px;

  @media (max-width: 400px) {
    max-height: 400px;
  }
`;

export const InputBox = styled.div`
  width: 80%;
  height: auto;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Target = styled.input`
  width: 80%;
  height: 25px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const Date = styled.input`
  width: 80%;
  height: 25px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const Type = styled.input`
  width: 80%;
  height: 25px;
  background: #f0f0f0;
  padding: 1rem;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

export const Amount = styled.input`
  width: 80%;
  height: 25px;
  background: #f0f0f0;
  padding: 1rem;
  font-size: 0.9rem;
`;

export const BtnBox = styled.div`
  width: 80%;
  max-width: 820px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  .add {
    width: 40%;
    height: 60px;
    background: #3c57b3;
    color: white;
    font-size: 1.2rem;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      transition: 0.5s;
      opacity: 30%;
    }
  }

  .get {
    width: 40%;
    height: 60px;
    background: #3c57b3;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      transition: 0.5s;
      opacity: 30%;
    }
  }

  @media (max-width: 400px) {
    margin-top: 20px;
  }

  @media (max-width: 550px) {
    .add {
      width: 45%;
      margin-right: 10px;
      height: 50px;
      font-size: 1rem;
    }

    .get {
      width: 45%;
      height: 50px;
      font-size: 1rem;
    }
  }
`;
