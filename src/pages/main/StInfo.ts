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
      left: 40%;
    }

    span {
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: left;
      top: 60px;
      left: 40%;
      width: 100%;
    }

    p {
      top: 130px;
      left: 40%;
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
      width: 120px;
      height: 120px;
      font-size: 14px;
      line-height: 1.5rem;
      top: -80px;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 10px;
    }

    div:nth-child(2) {
      width: 120px;
      height: 120px;
      font-size: 14px;
      line-height: 1.5rem;
      top: 20px;
      left: 50%;
      transform: translate(-100%, 0);
      padding: 10px;
    }

    div:nth-child(3) {
      width: 120px;
      height: 120px;
      font-size: 14px;
      line-height: 1.5rem;
      top: 20px;
      left: 50%;
      transform: translate(-3%, 0);
      padding: 10px;
    }
  }
`;

export const Info1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 730px;
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
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  .imgBox {
    width: 60%;
    height: 900px;
    position: relative;

    img {
      width: 100%;
      max-width: 550px;
      background: #f5f5f5;
      border-radius: 20px;
      -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
      box-shadow: 7px 7px 7px 1px #e8e8e8;
    }

    img:first-child {
      position: absolute;
      top: 100px;
      right: 20%;
    }

    .famImg2 {
      position: absolute;
      top: 150px;
      right: 0%;
    }
  }

  .textBox {
    width: 40%;
    height: 900px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 50px;
    color: #2e2e2e;

    p {
      white-space: normal;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h3 {
      white-space: normal;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    max-height: 550px;

    .imgBox {
      width: 70%;
      height: 250px;

      img:first-child {
        position: absolute;
        top: 40px;
        right: 10%;
      }

      .famImg2 {
        position: absolute;
        top: 70px;
        right: -10%;
      }
    }

    .textBox {
      width: 100%;
      height: 300px;
      text-align: center;
      padding-left: 0px;
      position: relative;

      p {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        margin-top: 50px;
        margin-bottom: 10px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 900px;
  background: #bccaee;

  img {
    width: 80%;
    max-width: 550px;
    background: #f5f5f5;
    border-radius: 20px;
    -webkit-box-shadow: 6px 6px 7px 1px #8f9fc9;
    box-shadow: 7px 7px 7px 1px #8f9fc9;
  }

  .textBox {
    height: 900px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 50px;
    color: #2e2e2e;

    p {
      white-space: normal;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h3 {
      white-space: normal;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    height: 500px;

    img {
      width: 70%;
      margin-right: 0;
    }

    .textBox {
      width: 100%;
      height: 100px;
      text-align: center;
      margin-top: -10px;
      padding-right: 0px;
      position: relative;

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
      }
    }
  }
`;

export const Info4 = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;

  .imgBox {
    width: 60%;
    height: 900px;
    position: relative;

    img {
      width: 100%;
      max-width: 550px;
      border-radius: 20px;
      -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
      box-shadow: 7px 7px 7px 1px #e8e8e8;
    }

    img:first-child {
      position: absolute;
      top: 100px;
      right: 20%;
    }

    .cal {
      position: absolute;
      top: 150px;
      right: 0%;
    }
  }

  .textBox {
    width: 40%;
    height: 900px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 50px;
    color: #2e2e2e;

    p {
      white-space: normal;
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h3 {
      white-space: normal;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
    max-height: 550px;

    .imgBox {
      width: 70%;
      height: 250px;

      img:first-child {
        position: absolute;
        top: 40px;
        right: 10%;
      }

      .cal {
        position: absolute;
        top: 70px;
        right: -10%;
      }
    }

    .textBox {
      width: 100%;
      height: 250px;
      text-align: center;
      padding-left: 0px;
      position: relative;

      p {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
      }

      h3 {
        white-space: normal;
        font-size: 1rem;
        font-weight: bold;
        margin-top: 50px;
        margin-bottom: 10px;
      }
    }
  }
`;

export const Info5 = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;

  .left {
    width: 50%;
    height: auto;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    padding: 20px;

    .chart {
      width: 100%;
      max-width: 500px;
      border-radius: 20px;
      -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
      box-shadow: 7px 7px 7px 1px #e8e8e8;
    }

    p {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2e2e2e;
      margin-bottom: 20px;
      text-align: center;
      padding-right: 150px;
    }
  }

  .right {
    width: 50%;
    height: auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;

    img {
      width: 100%;
      max-width: 500px;
      border-radius: 20px;
      -webkit-box-shadow: 6px 6px 7px 1px #e8e8e8;
      box-shadow: 7px 7px 7px 1px #e8e8e8;
    }

    p {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2e2e2e;
      margin-bottom: 20px;
      text-align: center;
      padding-left: 170px;
    }
  }

  @media (max-width: 550px) {
    height: 900px;
    flex-direction: column;

    .left {
      width: 80%;
      align-items: center;
      flex-direction: column;
      padding: 20px;

      p {
        font-size: 16px;
        font-weight: bold;
        color: #2e2e2e;
        margin-bottom: 20px;
        text-align: center;
        padding-right: 0;
      }
    }

    .right {
      width: 80%;
      align-items: center;
      flex-direction: column;
      padding: 20px;

      p {
        font-size: 16px;
        font-weight: bold;
        color: #2e2e2e;
        margin-bottom: 20px;
        text-align: center;
        padding-left: 0;
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
