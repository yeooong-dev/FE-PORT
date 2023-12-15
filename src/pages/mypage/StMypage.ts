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
  .p_img {
    width: 180px;
    height: 180px;
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
    margin-top: 45px;
    margin-bottom: 8px;
    letter-spacing: 5px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .name {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 50px;
    letter-spacing: 5px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
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
    }
  }
`;

export const TabContainer = styled.div<darkProps>`
  width: 100%;
  max-width: 900px;
  height: 480px;
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
`;

export const TabTop = styled.div<darkProps>`
  width: 100%;
  display: flex;
`;

export const Tab = styled.div<TabProps & darkProps>`
  width: 100%;
  height: 60px;
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
  height: 430px;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 80%;
    max-width: 400px;
    height: 55px;
    margin-bottom: 20px;
    padding-left: 1rem;
    font-size: 1rem;
  }

  button {
    width: 80%;
    max-width: 420px;
    height: 55px;
    font-size: 1.1rem;
    background: #3c57b3;
    color: white;
    cursor: pointer;
  }

  button:hover {
    opacity: 50%;
    transition: 0.3s;
  }

  @media (max-width: 550px) {
    input {
      width: 70%;
      height: 40px;
      font-size: 14px;
    }

    button {
      height: 40px;
      font-size: 14px;
    }

    button:hover {
      opacity: 100%;
    }
  }
`;
