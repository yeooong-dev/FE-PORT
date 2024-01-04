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
    color: #ffea00;
    text-align: right;
    line-height: 2rem;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    width: 100%;
    top: 50px;
    left: 50%;
    transform: translate(-80%, 0);

    h1 {
      font-size: 2rem;
      left: 160px;
    }

    span {
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: left;
      top: 60px;
      left: 160px;
      width: 100%;
    }

    p {
      top: 150px;
      left: 160px;
      text-align: left;
      font-size: 1.2rem;
    }
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

  @media (max-width: 550px) {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    div:nth-child(1) {
      width: 140px;
      height: 140px;
      font-size: 14px;
      line-height: 1.5rem;
      top: -70px;
      left: 105px;
    }

    div:nth-child(2) {
      width: 140px;
      height: 140px;
      font-size: 14px;
      line-height: 1.5rem;
      top: 30px;
      left: 40px;
    }

    div:nth-child(3) {
      width: 140px;
      height: 140px;
      font-size: 14px;
      line-height: 1.5rem;
      top: 30px;
      left: 170px;
    }
  }
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

  @media (max-width: 550px) {
    width: 100%;
    height: 600px;
    flex-direction: column;
  }
`;

export const Info2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 750px;
  background: white;

  img {
    width: 50%;
    max-width: 600px;
    background: #f5f5f5;
    border-radius: 20px;
    margin-bottom: 20px;
    margin-right: 30px;
  }

  p {
    white-space: normal;
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: bold;
    color: #2e2e2e;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    height: 500px;

    img {
      width: 80%;
      margin-right: 0;
    }

    p {
      text-align: center;
    }
  }
`;

export const Info3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  max-height: 800px;
  background: #bccaee;

  div {
    width: 50%;
    height: 100vh;
    position: relative;

    img {
      width: 100%;
      max-width: 550px;
      background: #f5f5f5;
      border-radius: 20px;
      box-shadow: 4px 4px 8px 2px rgba(94, 94, 94, 0.09);
      -webkit-box-shadow: 4px 4px 8px 2px rgba(94, 94, 94, 0.09);
      -moz-box-shadow: 4px 4px 8px 2px rgba(94, 94, 94, 0.09);
    }

    img:first-child {
      position: absolute;
      top: 180px;
      right: 25%;
    }

    .famImg2 {
      position: absolute;
      top: 320px;
      right: 5%;
    }
  }

  p {
    width: 20%;
    height: 50vh;
    white-space: normal;
    font-size: 1.2rem;
    line-height: 2rem;
    text-align: right;
    padding-right: 50px;
    padding-top: 150px;
    font-weight: bold;
    color: #2e2e2e;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    max-height: 550px;

    div {
      width: 80%;
      margin-top: -100px;

      img {
        width: 80%;
        margin-right: 0;
      }

      img:first-child {
        top: 0;
        right: 20%;
      }

      .famImg2 {
        position: absolute;
        top: 50px;
        right: 0;
      }
    }

    p {
      width: 100%;
      text-align: center;
      padding-right: 0;
      padding-top: 80px;
    }
  }
`;

export const Info4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  max-height: 800px;
  background: #f0f0f0;

  div {
    width: 100%;
    max-width: 600px;
    height: auto;
    position: relative;

    img {
      width: 100%;
      border-radius: 20px;
    }

    img:first-child {
      position: absolute;
      top: -350px;
      right: 10%;
    }

    .cal {
      position: absolute;
      top: -250px;
      right: -5%;
    }
  }

  p {
    width: 20%;
    height: 50vh;
    white-space: normal;
    font-size: 1.2rem;
    line-height: 2rem;
    text-align: left;
    padding-top: 300px;
    padding-left: 50px;
    font-weight: bold;
    color: #2e2e2e;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    max-height: 500px;

    div {
      width: 80%;

      img {
        width: 80%;
        margin-right: 0;
      }

      img:first-child {
        top: 70px;
        left: 0;
      }

      .cal {
        top: 120px;
        left: 50px;
      }
    }

    p {
      width: 100%;
      text-align: center;
      padding-left: 0;
      padding-top: 0px;
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
