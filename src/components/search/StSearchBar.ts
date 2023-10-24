import { styled } from "styled-components";

export const SearchWrap = styled.div`
  height: 107px;
  padding-right: 5rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
`;

export const SearchInput = styled.input`
  width: 280px;
  height: 50px;
  border: none;
  border-radius: 8px;
  padding-left: 1.5rem;
  margin-right: 10px;
`;

export const SerchBtn = styled.button<{ darkMode: boolean }>`
  width: 40px;
  height: 20px;
  border: none;
  background: none;
  margin-bottom: 8px;
  cursor: pointer;

  .icon {
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#293642")};
  }
`;
