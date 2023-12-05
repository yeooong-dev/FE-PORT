import { styled } from "styled-components";

export const SearchWrap = styled.div`
  height: 107px;
  padding-right: 5rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  top: 0;
`;

export const SearchInput = styled.input<{ visible: boolean }>`
  width: ${({ visible }) => (visible ? "240px" : "0")};
  height: 50px;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding-left: 1rem;
  margin-left: 10px;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  ${({ visible }) => !visible && "opacity: 0;"};
  font-size: 1rem;
`;

export const SearchBtn = styled.button<{ darkMode: boolean }>`
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

export const Search = styled.button<{ darkMode: boolean }>`
  width: 70px;
  height: 50px;
  cursor: pointer;
  background: #51439d;
  color: white;
  font-size: 1rem;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const ResultWrap = styled.div`
  width: 80%;
  height: 82vh;
  overflow: scroll;

  div {
    width: 100%;
    height: auto;
    border: 1px solid #dbdbdb;
    margin-bottom: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  div:hover {
    background: #d1d4e0;
    cursor: pointer;
  }

  p {
    margin-top: 50px;
    font-size: 1.2rem;
  }
`;
