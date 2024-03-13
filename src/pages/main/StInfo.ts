import styled from "styled-components";

export const Wrap = styled.div`
    width: 100%;
    overflow-x: hidden;
    display: flex;
`;

export const InfoWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: white;

    @media (max-width: 550px) {
        justify-content: center;
    }
`;

export const Center = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width: 550px) {
        width: 100%;
    }
`;

export const Left = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .circle1 {
        position: absolute;
        top: 180px;
        left: 30%;
        width: 115px;
        height: 115px;
        background: none;
        border-radius: 50%;
        border: 40px solid white;
        opacity: 20%;
    }

    .circle2 {
        position: absolute;
        top: 180px;
        left: 40%;
        width: 120px;
        height: 120px;
        background: none;
        border-radius: 50%;
        border: 2px solid #e9e938;
        opacity: 20%;
    }

    h1 {
        width: 300px;
        font-size: 5rem;
        color: white;
        font-family: var(--font-logo);
        margin-bottom: 20px;
    }

    span {
        width: 300px;
        font-size: 1.4rem;
        color: white;
        text-align: left;
        line-height: 2.3rem;
    }

    p {
        width: 300px;
        font-size: 1.5rem;
        font-weight: 900;
        opacity: 80%;
        color: #ffea00;
        text-align: left;
        line-height: 2rem;
        cursor: pointer;
        margin-top: 50px;
    }

    @media (max-width: 550px) {
        width: 100%;

        .circle1 {
            position: absolute;
            top: 50px;
            left: -10%;
        }

        .circle2 {
            position: absolute;
            top: 120px;
            left: 15%;
        }

        h1 {
            font-size: 2rem;
        }

        span {
            font-size: 1rem;
            line-height: 1.5rem;
            text-align: left;
        }

        p {
            text-align: left;
            font-size: 1.2rem;
        }
    }
`;

export const Info1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 600px;
    background: #3c57b3;
    clip-path: ellipse(100% 100% at 50% 0%);
    -webkit-box-shadow: 3px 3px 8px 5px #4a4851;
    box-shadow: 3px 3px 8px 5px #37363b;

    @media (max-width: 550px) {
        width: 100%;
        height: 590px;
        flex-direction: column;
    }
`;

export const Info2 = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 80px;
    text-align: center;

    .wrap {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            display: flex;
            width: 80%;
            max-width: 500px;
            background: #f5f5f5;
            border-radius: 20px;
            -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
            box-shadow: 7px 7px 7px 1px #e8e8e8;
        }

        .imgBox {
            display: flex;
            gap: 20px;
        }
    }

    .textBox {
        width: 100%;
        margin: 20px;

        p {
            white-space: normal;
            font-size: 1.2rem;
            line-height: 2rem;
            font-weight: bold;
        }

        h3 {
            white-space: normal;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 1200px) {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        padding: 80px;
        text-align: center;

        .wrap {
            width: 70%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            img {
                display: flex;
                width: 100%;
                max-width: 500px;
                background: #f5f5f5;
                border-radius: 20px;
                -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
                box-shadow: 7px 7px 7px 1px #e8e8e8;
            }

            .imgBox {
                display: flex;
                flex-direction: column;
                gap: 30px;
            }
        }
    }

    @media (max-width: 550px) {
        padding: 60px;

        .textBox {
            margin: 0px;

            p {
                font-size: 14px;
                line-height: 20px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            h3 {
                white-space: normal;
                font-size: 1rem;
                font-weight: bold;
            }
        }
    }
`;

export const Info3 = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 80px;
    text-align: center;

    .wrap {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            display: flex;
            width: 80%;
            max-width: 500px;
            background: #ffffff;
            border-radius: 20px;
            -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
            box-shadow: 7px 7px 7px 1px #e8e8e8;
        }

        .imgBox {
            display: flex;
            gap: 20px;
        }
    }

    .textBox {
        width: 100%;
        margin: 5px;

        p {
            white-space: normal;
            font-size: 1.2rem;
            line-height: 2rem;
            font-weight: bold;
            margin-bottom: 0px;
        }

        h3 {
            white-space: normal;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }

    @media (max-width: 1200px) {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        padding: 80px;
        text-align: center;

        .wrap {
            width: 70%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            img {
                display: flex;
                width: 100%;
                max-width: 500px;
                background: #f5f5f5;
                border-radius: 20px;
                -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
                box-shadow: 7px 7px 7px 1px #e8e8e8;
            }

            .imgBox {
                display: flex;
                flex-direction: column;
                gap: 30px;
            }
        }
    }

    @media (max-width: 550px) {
        padding: 40px;

        .textBox {
            margin: 0px;

            p {
                font-size: 14px;
                line-height: 20px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            h3 {
                white-space: normal;
                font-size: 1rem;
                font-weight: bold;
                margin-bottom: 5px;
            }
        }
    }
`;

export const Info4 = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 80px;
    text-align: center;

    .wrap {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 50px;

        img:first-child {
        }

        img {
            display: flex;
            width: 80%;
            max-width: 480px;
            background: #f5f5f5;
            border-radius: 20px;
            -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
            box-shadow: 7px 7px 7px 1px #e8e8e8;
        }

        .imgBox {
            display: flex;
            gap: 30px;
        }
    }

    .textBox {
        width: 100%;
        margin: 20px;

        p {
            white-space: normal;
            font-size: 1.2rem;
            line-height: 1%.5;
            font-weight: bold;
            margin-bottom: 10px;
        }
    }

    @media (max-width: 1200px) {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        padding: 80px;
        text-align: center;

        .wrap {
            width: 70%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            img {
                display: flex;
                width: 100%;
                max-width: 500px;
                background: #f5f5f5;
                border-radius: 20px;
                -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
                box-shadow: 7px 7px 7px 1px #e8e8e8;
            }

            .imgBox {
                display: flex;
                flex-direction: column;
                gap: 30px;
            }
        }
    }

    @media (max-width: 550px) {
        padding: 40px;

        .textBox {
            margin: 0;
            p {
                font-size: 14px;
                line-height: 25px;
                font-weight: bold;
                margin-bottom: 0px;
            }
        }
    }
`;

export const Bottom = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #32324b;
    color: white;

    @media (max-width: 550px) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

export const LeftFooter = styled.div`
    padding-left: 7rem;

    h1 {
        font-family: var(--font-logo);
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 5px;
        color: #d1d1d1;
    }

    @media (max-width: 550px) {
        width: 80%;
        padding-left: 0;
        font-size: 14px;
        margin-top: 45px;
    }
`;

export const RightFooter = styled.div`
    padding-right: 7rem;
    color: #d1d1d1;

    @media (max-width: 550px) {
        width: 80%;
        text-align: left;
        font-size: 14px;
        padding-right: 0;
        margin-top: 20px;
    }
`;
