import React from "react";
import { useDarkMode } from "../darkmode/DarkModeContext";

interface CustomConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomConfirm: React.FC<CustomConfirmProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 99,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: darkMode ? "#3d3d3d" : "#fff",
          padding: "4rem",
          borderRadius: "5px",
          fontSize: "1.3rem",
          zIndex: 100,
          width: "50%",
          minWidth: "100px",
          maxWidth: "240px",
        }}
      >
        <div
          style={{
            width: "100%",
            color: darkMode ? "#fff" : "#000",
            marginBottom: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "50px",
          }}
        >
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            style={{
              background: "#3c57b3",
              color: "white",
              width: "20%",
              minWidth: "100px",
              maxWidth: "220px",
              height: "50px",
              borderRadius: "5px",
              fontSize: "1.2rem",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            확인
          </button>
          <button
            onClick={onCancel}
            style={{
              background: darkMode ? "#696969" : "#d1d1d1",
              color: "white",
              width: "20%",
              minWidth: "100px",
              maxWidth: "220px",
              height: "50px",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomConfirm;
