import styled from "styled-components";

interface ListProps {
  isSelected: boolean;
}

interface showProps {
  show: boolean;
}

export const ChatWrap = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftWrap = styled.div<showProps>`
  width: 40%;
  max-width: 350px;
  height: 79vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0.5rem 1rem 1rem 2rem;
  flex-direction: column;

  @media (max-width: 550px) {
    width: ${(props) => (props.show ? "0" : "100%")};
    max-width: ${(props) => (props.show ? "0" : "500px")};
  }
`;

export const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: -10px;
  margin-bottom: 10px;

  .addBtn {
    background: none;
    cursor: pointer;
  }
`;

export const ToggleButton = styled.button`
  display: none;
  background: none;
  cursor: pointer;
  margin-right: 10px;

  @media (max-width: 550px) {
    display: block;
  }
`;

export const ListWrap = styled.div<showProps>`
  width: 100%;
  max-width: 350px;
  height: 79vh;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 8px 8px 5px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 8px 8px 5px 0px rgba(0, 0, 0, 0.08);

  @media (max-width: 550px) {
    display: ${(props) => (props.show ? "none" : "flex")};
    width: ${(props) => (props.show ? "0" : "95%")};
    max-width: ${(props) => (props.show ? "0" : "500px")};
  }
`;

export const List = styled.div<ListProps>`
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#3c57b3" : "transparent")};
  color: ${(props) => (props.isSelected ? "white" : "black")};

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .flex {
    margin-right: 10px;

    p {
      width: 100%;
    }

    p:first-child {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
  }

  .exit {
    width: 50px;
    height: 30px;
    background: #3c57b3;
    color: white;
  }
`;

export const RightWrap = styled.div<showProps>`
  width: 80%;
  max-width: 1400px;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;

  .chatBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .you {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .you_msg {
        background: #f4f5fb;
        max-width: 70%;
        padding: 13px 15px;
        border-radius: 10px;
        align-self: flex-end;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-size: 14px;
      }

      img {
        width: 35px;
        height: 35px;
        border-radius: 50px;
      }
    }

    .me {
      background: #e0ffff;
      max-width: 70%;
      padding: 13px 15px;
      border-radius: 10px;
      align-self: flex-end;
      margin-bottom: 15px;
    }

    .inputBox {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 20px;

      input {
        width: 82%;
        height: 50px;
        border: 1.5px solid #e0e0e0;
        border-radius: 50px;
        margin-right: 10px;
        padding-left: 1rem;
      }

      button {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        color: #3c57b3;
        font-weight: bold;
        border: 1.5px solid #e1e5f0;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 550px) {
    display: ${(props) => (props.show ? "flex" : "none")};
    width: ${(props) => (props.show ? "100%" : "0")};
  }
`;
