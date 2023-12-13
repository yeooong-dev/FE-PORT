import React from "react";

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
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          zIndex: 99,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "6rem 5rem",
          borderRadius: "5px",
          fontSize: "1.5rem",
          zIndex: 100,
          width: "300px",
        }}
      >
        <div
          style={{
            color: "black",
            marginBottom: "50px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
              width: "150px",
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
              background: "#d1d1d1",
              color: "white",
              width: "150px",
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
