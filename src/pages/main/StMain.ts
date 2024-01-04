import styled from "styled-components";

interface darkProps {
  darkMode: boolean;
}

export const Wrap = styled.div`
  width: 90%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 550px) {
    overflow-y: scroll;
    height: auto;
    justify-content: flex-start;
  }
`;

export const WrapTop = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    flex-direction: column;
    height: auto;
    margin-top: 50px;
  }
`;

export const WrapTodo = styled.div<darkProps>`
  width: 70%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;

  h1 {
    font-size: 1rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 40px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .todolist {
    width: 100%;
    height: 350px;
    max-height: 350px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
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

  @media (max-width: 550px) {
    width: 90%;
    margin-right: 0px;
    margin-bottom: 20px;
  }
`;

export const CheckDiv = styled.div`
  background: none;
  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;
  border: 2px solid #3c57b3;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;

  &.checked {
    border: none;
    color: #cccccc;
  }
`;

export const WrapCalendar = styled.div<darkProps>`
  width: 30%;
  height: 100%;
  max-height: 385px;
  max-width: 800px;
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  div {
    width: 100%;
    max-width: 500px;
    height: auto;
    max-height: 385px;
    position: relative;
    bottom: 0;
    left: 0;
    margin: 0;
  }

  @media (max-width: 550px) {
    width: 90%;
    padding-top: 100px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
    margin-bottom: -5px;
    max-height: 280px;
  }
`;

export const WrapBottom = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  @media (max-width: 550px) {
    flex-direction: column;
    height: auto;
  }
`;

export const WrapEvent = styled.div<darkProps>`
  width: 70%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;

  h1 {
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    font-size: 1rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: 40px;
  }

  .event {
    width: 100%;
    height: 350px;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
    border-radius: 20px;
    padding: 2rem;
    overflow-y: auto;
    max-height: 350px;

    .eventHeaders {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
      margin-bottom: 0px;
    }

    .eventItem {
      font-size: 1.1rem;
      padding-top: 20px;
      margin-bottom: 10px;
      color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
      border-bottom: 1px solid #e8e8e8;
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
      flex-basis: 20%;
      text-align: center;
      margin-bottom: 30px;
    }
  }

  @media (max-width: 550px) {
    width: 90%;
    height: 50%;
    margin-right: 0px;
    margin-bottom: 20px;

    .event {
      .eventHeaders {
        font-size: 1rem;
      }

      .eventItem {
        font-size: 1rem;
      }
    }
  }
`;

export const WrapSocket = styled.div<darkProps>`
  width: 30%;
  max-height: 410px;
  overflow-y: auto;
  max-width: 600px;
  background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
  color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  border-radius: 20px;

  h1 {
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    font-size: 1rem;
    text-align: left;
    font-family: var(--font-title);
    margin-bottom: -60px;
    padding: 35px;
  }

  @media (max-width: 550px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
