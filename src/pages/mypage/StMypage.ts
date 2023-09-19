import styled from "styled-components";

export const ContentTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2e2e2e;
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
    margin-left: 130px;
  }

  .hi {
    font-size: 1.4rem;
    margin-top: 40px;
    margin-bottom: 8px;
  }

  .name {
    font-size: 1.5rem;
    color: #51439d;
    font-weight: 600;
    margin-bottom: 80px;
  }
`;

export const InfoTitle = styled.h3`
  font-size: 1.2rem;
  color: #2e2e2e;
  margin-right: 68%;
  margin-bottom: 15px;
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
    margin-top: 100px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const NameEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: #ccd2e0;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

export const PwEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: #ccd2e0;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

export const DeleteAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background: #ccd2e0;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
