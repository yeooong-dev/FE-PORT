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
`;

export const Profile = styled.div<darkProps>`
  .p_img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #ccd2e0;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  div {
    margin-top: -60px;
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
    margin-bottom: 40px;
    letter-spacing: 5px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#51439d")};
  }
`;

export const TabContainer = styled.div<darkProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 490px;
  background: ${({ darkMode }) => (darkMode ? "#333" : "#f6f6f6")};
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
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
      ? "#51439d"
      : "#ababab"};
  cursor: pointer;
  font-size: 1.25rem;
  border-top: 1px solid #cfcfcf;

  &:nth-child(1) {
    border-right: 1px solid #cfcfcf;
    border-left: 1px solid #cfcfcf;
  }

  &:nth-child(2) {
    border-right: 1px solid #cfcfcf;
  }

  &:nth-child(3) {
    border-right: 1px solid #cfcfcf;
  }
`;

export const Info = styled.div`
  width: 100%;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #f6f6f6;
  font-size: 1.2rem;
  opacity: 80%;
`;

export const NameEdit = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 380px;
    height: 55px;
    margin-bottom: 20px;
    padding-left: 1rem;
    font-size: 1rem;
  }

  button {
    width: 395px;
    height: 55px;
    font-size: 1.1rem;
    background: #51439d;
    color: white;
    cursor: pointer;
    border-radius: 10px;
  }
`;
