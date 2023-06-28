import styled from "styled-components";

export const InfoWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Top = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Center = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 780px;
        background: beige;
        border-bottom: 1px solid black;
    }
`;

export const Bottom = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LeftFooter = styled.div`
    padding-left: 7rem;
`;

export const RightFooter = styled.div`
    padding-right: 7rem;
`;
