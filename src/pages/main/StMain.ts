import styled from "styled-components";

interface darkProps {
    darkMode: boolean;
}

export const Wrap = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 30px;

    @media (max-width: 550px) {
        height: auto;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        padding: 50px;
    }
`;

export const WrapLeft = styled.div`
    width: 60%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 10px;

    @media (max-width: 550px) {
        width: 100%;
        height: auto;
    }
`;

export const WrapTodo = styled.div<darkProps>`
    width: 100%;
    max-width: 1000px;
    height: auto;
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 30px;

    h1 {
        font-size: 1rem;
        text-align: left;
        font-family: var(--font-title);
        margin-bottom: 40px;
        color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    }

    .todolist {
        width: 100%;
        height: 320px;
        max-height: 350px;
        background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
        color: ${({ darkMode }) => (darkMode ? "white" : "#5b5b5b")};
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
        width: 100%;
        align-items: flex-start;
        margin-right: 0px;
        margin-bottom: 40px;
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

export const WrapEvent = styled.div<darkProps>`
    width: 100%;
    max-width: 1000px;
    height: auto;
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
        height: 320px;
        background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
        border-radius: 20px;
        padding: 2rem;
        overflow-y: auto;
        max-height: 350px;

        .eventHeaders {
            font-size: 1rem;
            font-weight: bold;
            color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
            margin-bottom: 0px;
        }

        .eventItem {
            font-size: 1rem;
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
        width: 100%;
        height: 50vh;
        margin-right: 0px;
        margin-bottom: 40px;

        .event {
            height: 300px;

            .eventHeaders {
                font-size: 1rem;
            }

            .eventItem {
                font-size: 1rem;
            }
        }
    }
`;

export const WrapRight = styled.div<darkProps>`
    width: 40%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0;
    border-radius: 20px;
    overflow-y: scroll;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};

    @media (max-width: 550px) {
        width: 100%;
        height: auto;
    }
`;

export const WrapCalendar = styled.div<darkProps>`
    width: 100%;
    height: auto;
    max-width: 800px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    border-radius: 20px;

    h1 {
        color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
        font-size: 1rem;
        text-align: left;
        font-family: var(--font-title);
        padding: 25px 20px;
        /* margin-bottom: 40px; */
    }

    div {
        width: 100%;
        max-width: 500px;
        height: auto;
        max-height: 400px;
    }

    @media (max-width: 550px) {
        width: 90%;
        background: ${({ darkMode }) => (darkMode ? "#323336" : "#f7f7f7")};
    }
`;

export const SchedulesList = styled.div<darkProps>`
    width: 50%;
    height: 230px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 25px 50px 20px 50px;
    border-radius: 20px;
    background: ${({ darkMode }) => (darkMode ? "#2a2a2a" : "#ffffff")};
    margin-bottom: 30px;
    overflow-y: auto;

    .schedule-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;

        p:first-child {
            margin-bottom: 5px;
        }

        p:last-child {
            color: #afafaf;
            margin-bottom: 25px;
        }
    }
    @media (max-width: 550px) {
        height: auto;
        width: 70%;
        padding: 20px;

        .schedule-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 1.5rem;
            text-align: center;
        }

        p {
            width: 100%;
        }

        p:last-child {
            font-size: 14px;
        }
    }
`;
