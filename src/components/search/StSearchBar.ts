import { styled } from "styled-components";

export const SearchWrap = styled.div`
  height: 107px;
  padding-right: 5rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 280px;
  height: 43px;
  border: none;
  border-radius: 8px;
  padding-left: 1.5rem;
  -webkit-box-shadow: 3px 3px 7px 1px #cacdd5;
  box-shadow: 3px 3px 7px 1px #cacdd5;
  margin-right: 10px;
`;

export const SerchBtn = styled.button`
  width: 40px;
  height: 20px;
  border: none;
  background: none;
  margin-bottom: 8px;
  cursor: pointer;
`;
