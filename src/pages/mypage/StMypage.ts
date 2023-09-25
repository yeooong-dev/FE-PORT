import styled from "styled-components";

interface TabProps {
  selected: boolean;
  onClick: () => void;
}

export const ContentTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4c4959;
  font-family: var(--font-logo);
`;

export const Profile = styled.div`
  .p_img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #ccd2e0;
    margin-bottom: 30px;
  }

  div {
    margin-top: -90px;
  }
  .edit {
    cursor: pointer;
    margin-top: -15px;
    margin-left: 145px;

    &:hover {
      transform: scale(1.4);
      transition: 0.3s;
    }
  }

  .hi {
    font-size: 1.4rem;
    margin-top: 45px;
    margin-bottom: 8px;
  }

  .name {
    font-size: 1.5rem;
    color: #51439d;
    font-weight: 600;
    margin-bottom: 80px;
  }
`;

export const Info = styled.div`
  width: 75%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  background: #f6f6f6;
  margin-right: 20px;
  font-size: 1.2rem;
  opacity: 80%;
  padding: 20px;

  .con {
    margin-top: 70px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const NameEdit = styled.div`
  span {
    margin-right: 10px;
  }

  input {
    width: 300px;
    height: 45px;
    background: #e8ecf5;
  }
`;

export const Tab = styled.div<TabProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: ${(props) => (props.selected ? "#51439d" : "#ccd2e0")};
  color: ${(props) => (props.selected ? "white" : "2e2e2e")};
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
  cursor: pointer;

  .nameEditBtn {
  }
  .passwordEditBtn {
  }
  .deleteAccountEditBtn {
  }
`;
