import styled from "styled-components";

export const InfoWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #f5f5f5;
`;

export const Center = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Info1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 800px;
    background: #3c57b3;
    clip-path: ellipse(100% 100% at 50% 0%);
    -webkit-box-shadow: 3px 3px 8px 5px #4a4851;
    box-shadow: 3px 3px 8px 5px #37363b;
`;

export const Info2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 680px;
    background: #f5f5f5;

    div {
        width: 70%;
        height: 480px;
        background: #f5f5f5;
        border-radius: 20px;
        margin-bottom: 20px;
    }

    p {
        width: 600px;
        white-space: normal;
        font-size: 1.1rem;
        color: white;
        line-height: 1.8rem;
    }
`;

export const Info3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 780px;
    background: #bccaee;
`;

export const Info4 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 780px;
    background: #e3e6ea;
`;

export const Left = styled.div`
    position: relative;
    top: -200px;
    right: 0;
    width: 40%;

    .circle1 {
        position: absolute;
        top: -120px;
        right: 120px;
        width: 115px;
        height: 115px;
        background: none;
        border-radius: 50%;
        border: 40px solid white;
        opacity: 20%;
    }

    .circle2 {
        position: absolute;
        top: -40px;
        right: 250px;
        width: 120px;
        height: 120px;
        background: none;
        border-radius: 50%;
        border: 2px solid #e9e938;
        opacity: 20%;
    }

    h1 {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 5rem;
        color: white;
        font-family: var(--font-logo);
        margin-bottom: 20px;
    }

    span {
        position: absolute;
        top: 120px;
        right: 0;
        font-size: 1.5rem;
        color: white;
        text-align: right;
        line-height: 2.3rem;
    }

    p {
        position: absolute;
        top: 280px;
        right: 0;
        font-size: 1.5rem;
        font-weight: 900;
        opacity: 80%;
        color: #ffe100;
        text-align: right;
        line-height: 2rem;
        cursor: pointer;
    }
`;

export const Right = styled.div`
    width: 43%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: -260px;
    right: 0;

    div:nth-child(1) {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        text-align: center;
        border: 2px solid #d5d5d5;
        position: absolute;
        top: 0;
        left: 0;
        color: #d5d5d5;
        font-size: 1.5rem;
        background: #3c57b3;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-box-shadow: 3px 3px 3px 5px #443985;
        box-shadow: 3px 3px 3px 5px #344194;
        line-height: 2.5rem;
    }

    div:nth-child(2) {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        text-align: center;
        border: 2px solid #d5d5d5;
        position: absolute;
        top: 180px;
        left: -120px;
        color: #d5d5d5;
        font-size: 1.5rem;
        background: #3c57b3;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-box-shadow: 3px 3px 3px 5px #443985;
        box-shadow: 3px 3px 3px 5px #344194;
        line-height: 2.5rem;
    }

    div:nth-child(3) {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        text-align: center;
        border: 2px solid #d5d5d5;
        position: absolute;
        top: 180px;
        left: 120px;
        color: #d5d5d5;
        font-size: 1.5rem;
        background: #3c57b3;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-box-shadow: 3px 3px 3px 5px #443985;
        box-shadow: 3px 3px 3px 5px #344194;
        line-height: 2.5rem;
    }
`;

export const Bottom = styled.div`
    width: 100%;
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #32324b;
    color: white;
`;

export const LeftFooter = styled.div`
    padding-left: 7rem;
`;

export const RightFooter = styled.div`
    padding-right: 7rem;
`;
