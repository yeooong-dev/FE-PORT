import styled from "styled-components";

export const ChatWrap = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const LeftWrap = styled.div`
  width: 30%;
  height: 95%;
  border-right: 1.2px solid #bcbfc4;

  .addBtn {
    background: none;
    float: right;
    padding: 0px 15px;
    cursor: pointer;
  }

  .list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    border-bottom: 1px solid #bfbccf;
    padding: 20px;

    img {
      width: 80px;
      margin-right: 20px;
    }
  }
`;

export const RightWrap = styled.div`
  width: 70%;
`;
