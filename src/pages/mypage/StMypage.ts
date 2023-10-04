import styled from "styled-components";

interface TabProps {
  selected: boolean;
  onClick: () => void;
}

export const Profile = styled.div`
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
    color: #2e2e2e;
    letter-spacing: 5px;
  }

  .name {
    font-size: 2rem;
    color: #51439d;
    font-weight: 600;
    margin-bottom: 40px;
    letter-spacing: 5px;
  }
`;

export const TabContainer = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const TabTop = styled.div`
  width: 100%;
  display: flex;
`;

export const Tab = styled.div<TabProps>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.selected ? "#f4f4f6" : "#dcdee3")};
  color: ${(props) => (props.selected ? "#51439d" : "#ababab")};
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
  height: 450px;
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
