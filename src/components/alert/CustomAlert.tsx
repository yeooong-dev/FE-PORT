import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

interface CustomAlertProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

interface AlertContainerProps {
  type?: "error" | "success";
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  type = "error",
  onClose,
}) => {
  const formattedMessage = message.replace(/(.{15})/g, "$1\n");

  return ReactDOM.createPortal(
    <AlertContainer type={type}>
      <span>{formattedMessage}</span>
      <button onClick={onClose}>X</button>
    </AlertContainer>,
    document.body
  );
};

export default CustomAlert;

const AlertContainer = styled.div<AlertContainerProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${(props) =>
    props.type === "error" ? "#d43a2f" : "#91a4d9"};
  padding: 30px 40px;
  border-radius: 5px;
  color: #fff;
  font-size: 1.1rem;
  z-index: 1000;
  white-space: pre-line;

  button {
    margin-left: 20px;
    background: none;
    border: 2px solid white;
    cursor: pointer;
    font-size: 1rem;
    width: 25px;
    height: 25px;
    color: white;
    border-radius: 50%;
  }

  @media (max-width: 550px) {
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    padding: 20px 10px;
    text-align: center;
    line-height: 25px;

    button {
      width: 22px;
      height: 22px;
      font-size: 12px;
      margin-left: 5px;
    }
  }
`;
