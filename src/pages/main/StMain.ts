import styled from "styled-components";

interface darkProps {
  darkMode: boolean;
}

export const Wrap = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: flex-start;
`;

export const WrapLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const WrapTodo = styled.div<darkProps>`
  width: 100%;
  max-width: 650px;
  height: 100%;
  padding: 0rem 6rem;
  margin-top: 10px;
  margin-bottom: 10px;

  h1 {
    font-size: 1.2rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .todolist {
    width: 100%;
    height: 320px;
    max-height: 320px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f5f5f5")};
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    border-radius: 20px;
    padding: 2rem;
    overflow-y: auto;
    padding-bottom: 0;

    span {
      font-size: 1.2rem;
      text-align: left;
    }

    .todoItem {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
    }
  }
`;

export const CheckDiv = styled.div`
  background: none;
  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;
  border: 2px solid #3c57b3;
  border-radius: 20%;
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  justify-content: center;

  &.checked {
    border: none;
    color: #cccccc;
  }
`;

export const WrapEvent = styled.div<darkProps>`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin-bottom: 0;
  padding: 0rem 6rem;

  h1 {
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    font-size: 1.2rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 20px;
  }

  .event {
    width: 100%;
    height: 300px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f5f5f5")};
    border-radius: 20px;
    padding: 2rem 4rem;
    overflow-y: auto;
    max-height: 280px;

    .eventHeaders {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
      margin-bottom: 0px;
    }

    .eventItem {
      font-size: 1.1rem;
      padding-top: 20px;
      margin-bottom: 5px;
      color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
      border-bottom: 1px solid #b6b4c2;
    }

    .eventHeaders,
    .eventItem {
      display: flex;
      justify-content: space-between;
    }

    span.who,
    span.date,
    span.type,
    span.amount {
      flex-basis: 25%;
      text-align: center;
      margin-bottom: 30px;
    }
  }
`;

export const WrapRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const WrapCalendar = styled.div<darkProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    font-size: 1.2rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 40px;
    margin-left: 205px;
  }

  > div {
    transform: scale(0.8);
    transform-origin: center;
    padding: 0;
  }
`;

export const WrapSocket = styled.div<darkProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    font-size: 1.2rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 40px;
    margin-left: 205px;
  }
`;
