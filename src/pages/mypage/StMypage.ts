import styled from "styled-components";

interface TabProps {
    selected: boolean;
    onClick: () => void;
}

interface darkProps {
    darkMode: boolean;
}

export const Wrap = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const Profile = styled.div<darkProps>`
    width: 100%;
    height: auto;
    max-height: 300px;
    margin: 50px;

    .p_img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .icon {
        margin-top: -35px;
    }

    .edit {
        cursor: pointer;
        margin-top: -25px;
        margin-left: 140px;

        &:hover {
            transform: scale(1.4);
            transition: 0.3s;
        }
    }

    .hi {
        font-size: 1.6rem;
        margin-top: 20px;
        letter-spacing: 5px;
        color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    }

    .name {
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 5px;
        color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
    }

    @media (max-width: 550px) {
        margin: 30px 0 0 0;

        .p_img {
            width: 80px;
            height: 80px;
        }

        .edit {
            width: 25px;
            margin-top: -10px;
            margin-left: 70px;
        }

        .hi {
            font-size: 1rem;
            margin-top: 5px;
            margin-bottom: 0px;
        }

        .name {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 320px) {
        .hi {
            font-size: 14px;
        }

        .name {
            font-size: 1rem;
            margin-bottom: 20px;
        }
    }
`;

export const Info = styled.div<darkProps>`
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.2rem;
    border-radius: 20px;
    border: ${({ darkMode }) => (darkMode ? "2px solid #696969" : "2px solid #d6d6d6")};
    box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    -webkit-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 5px 5px 6px 4px rgba(0, 0, 0, 0.09);
    margin-top: 30px;
    margin-bottom: 50px;

    @media (max-width: 550px) {
        margin-bottom: 50px;
    }
`;

export const TabContainer = styled.div<darkProps>`
    width: 80%;
    max-width: 900px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const TabTop = styled.div<darkProps>`
    width: 80%;
    display: flex;

    @media (max-width: 550px) {
        width: 100%;
    }
`;

export const Tab = styled.div<TabProps & darkProps>`
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${(props) =>
        props.darkMode
            ? props.selected
                ? "2.5px solid #3c57b3"
                : "2.5px solid #696969"
            : props.selected
            ? "2.5px solid #3c57b3"
            : "2.5px solid #cfcfcf"};

    color: ${(props) =>
        props.darkMode ? (props.selected ? "#3c57b3" : "#696969") : props.selected ? "#3c57b3" : "#cfcfcf"};
    cursor: pointer;
    font-size: 1.25rem;

    @media (max-width: 550px) {
        font-size: 1rem;
    }
`;

export const NameEdit = styled.div<darkProps>`
    width: 100%;

    form {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    input {
        width: 50%;
        max-width: 250px;
        min-width: 100px;
        height: 45px;
        padding-left: 1rem;
        font-size: 16px;
        background: #f7f7f7;
        margin: 5px;
    }

    button {
        width: 100%;
        max-width: 100px;
        min-width: 260px;
        height: 45px;
        font-size: 16px;
        background: #3c57b3;
        color: white;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 10px;
    }

    button:hover {
        opacity: 50%;
        transition: 0.3s;
    }

    @media (max-width: 550px) {
        input {
            width: 100%;
            height: 40px;
        }

        button {
            min-width: 200px;
            height: 40px;
        }
    }
`;
