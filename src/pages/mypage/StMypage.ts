import styled from "styled-components";

interface TabProps {
  selected: boolean;
  onClick: () => void;
}

interface darkProps {
  darkMode: boolean;
}

export const Wrap = styled.div`
  width: 60%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 550px) {
    width: 80%;
    height: 80vh;
  }
`;

export const Profile = styled.div<darkProps>`
  width: 100%;
  height: auto;
  max-height: 300px;
  margin-bottom: 20px;

  .p_img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .icon {
    margin-top: -35px;
  }

  .edit {
    cursor: pointer;
    margin-top: -25px;
    margin-left: 140px;

    &:hover {
      transform: scale(1.4);
      transition: 0.3s;
    }
  }

  .hi {
    font-size: 1.6rem;
    margin-top: 20px;
    letter-spacing: 5px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .name {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 5px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
    margin-bottom: 30px;
  }

  @media (max-width: 550px) {
    .p_img {
      width: 80px;
      height: 80px;
    }

    .edit {
      width: 25px;
      margin-top: -10px;
      margin-left: 70px;
    }

    .hi {
      font-size: 1rem;
      margin-top: 5px;
      margin-bottom: 0px;
    }

    .name {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 320px) {
    .hi {
      font-size: 14px;
    }

    .name {
      font-size: 1rem;
      margin-bottom: 20px;
    }
  }
`;

export const TabContainer = styled.div<darkProps>`
  width: 100%;
  height: 350px;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  background: ${({ darkMode }) => (darkMode ? "#333" : "#f6f6f6")};
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 550px) {
    height: 300px;
  }

  @media (max-width: 320px) {
    height: 230px;
  }
`;

export const TabTop = styled.div<darkProps>`
  width: 100%;
  display: flex;
`;

export const Tab = styled.div<TabProps & darkProps>`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.darkMode
      ? props.selected
        ? "#333"
        : "#555"
      : props.selected
      ? "#f4f4f6"
      : "#dcdee3"};
  color: ${(props) =>
    props.darkMode
      ? props.selected
        ? "#fff"
        : "#ccc"
      : props.selected
      ? "#3c57b3"
      : "#ababab"};
  cursor: pointer;
  font-size: 1.25rem;

  @media (max-width: 550px) {
    font-size: 12px;
    height: 40px;
  }
`;

export const Info = styled.div<darkProps>`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
  font-size: 1.2rem;

  @media (max-width: 550px) {
    height: 300px;
  }
`;

export const NameEdit = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;

  input {
    width: 60%;
    height: 45px;
    margin-bottom: 20px;
    padding-left: 1rem;
    font-size: 1rem;
  }

  .lastInput {
    width: 480px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 80%;
    max-width: 280px;
    height: 50px;
    font-size: 1.1rem;
    background: #3c57b3;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 1000px) {
    .lastInput {
      max-width: 300px;
    }
  }

  @media (max-width: 850px) {
    .lastInput {
      max-width: 200px;
    }
  }

  @media (max-width: 660px) {
    .lastInput {
      max-width: 150px;
    }

    input {
      height: 35px;
      font-size: 14px;
    }

    button {
      width: 60%;
      max-width: 280px;
      height: 35px;
      font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    .lastInput {
      max-width: 170px;
    }
  }
`;
