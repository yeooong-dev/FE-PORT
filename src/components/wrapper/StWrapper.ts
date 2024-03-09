import styled from "styled-components";

interface RightProps {
    isSidebarOpen: boolean;
}

export const Wrap = styled.div<{
    darkMode: boolean;
    searchInputVisible: boolean;
}>`
    width: 100%;
    overflow-x: hidden;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background-color: ${({ darkMode }) => (darkMode ? "#323336" : "#f4f5fb")};
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};

    @media (max-width: 550px) {
        height: auto;
    }
`;

export const Left = styled.div`
    width: 280px;
    min-width: 280px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 1200px) {
        width: 30%;
        height: auto;
    }
`;

export const Right = styled.div<RightProps>`
    width: ${(props) => (props.isSidebarOpen ? "90%" : "100%")};
    margin-left: ${(props) => (props.isSidebarOpen ? "0" : "-180px")};
    transition: transform 0.5s ease;
    height: 96vh;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 550px) {
        width: ${(props) => (props.isSidebarOpen ? "100%" : "100%")};
        height: auto;
        margin-left: ${(props) => (props.isSidebarOpen ? "-135px" : "-300px")};
        transform: translateX(${(props) => (props.isSidebarOpen ? "100px" : "2px")});
        transition: transform 0.5s ease;
    }
`;

export const Contents = styled.div<{ darkMode: boolean }>`
    width: 98%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
    text-align: center;
    border-radius: 50px;
    box-shadow: 6px 6px 10px 5px rgba(0, 0, 0, 0.07);
    -webkit-box-shadow: 6px 6px 10px 5px rgba(0, 0, 0, 0.07);
    -moz-box-shadow: 6px 6px 10px 5px rgba(0, 0, 0, 0.07);

    @media (max-width: 550px) {
        margin-left: 20px;
        width: 90%;
        height: auto;
        margin-top: 25px;
        margin-bottom: 50px;
    }

    @media (max-width: 380px) {
        margin-left: 17px;
    }
`;

export const Logo = styled.div<{ darkMode: boolean }>`
    font-size: 2.3rem;
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#3c57b3")};
    font-family: var(--font-logo);
    cursor: pointer;

    @media (max-width: 550px) {
        font-size: 1.7rem;
    }
`;
