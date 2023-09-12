import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8ecf5;
`;

export const Left = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #bdcaee;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Right = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Contents = styled.div`
  width: 95%;
  height: 100vh;
  display: flex;
  background-color: #e8ecf5;
`;

export const Logo = styled.div`
  font-size: 2.3rem;
  color: #2a3642;
  font-family: var(--font-logo);
  cursor: pointer;
`;
