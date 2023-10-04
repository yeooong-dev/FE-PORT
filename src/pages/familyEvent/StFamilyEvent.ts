import styled from "styled-components";

export const FamilyEventWrap = styled.div`
  width: 55%;
  height: 750px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 40px;
  margin-top: 80px;
  box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
  -webkit-box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
  -moz-box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
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
