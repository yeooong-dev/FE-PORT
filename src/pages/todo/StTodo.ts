import styled from "styled-components";

export const TodoWrap = styled.div`
  width: 75%;
  height: 820px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  margin-top: 50px;
  box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
  -webkit-box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
  -moz-box-shadow: 9px 9px 5px -5px rgba(79, 79, 79, 0.19);
`;

export const TodoTop = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:50px;

  div{
    text-align:left;

    .date{
        font-size:1.4rem;
        color:#777777;
        font-weight:900;
        margin-bottom:20px;
    }
    .num {
        font-size:1.2rem;
        color:#51439d;
        font-weight:900;
    }
  }

    button {
        width:70px;
        height:70px;
        border-radius:50%;
        background:#51439d;
        color:white;
        font-size:2rem;
        cursor:pointer;

        &:hover{
            background:none;
            border:5px solid #51439d;
            transition:.5s;
            color:#51439d;
        }
    }
  }
`;

export const Todos = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 130px;
  overflow-y: auto;
  max-height: 480px;

  .between {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 0px;
      right: 0;
      bottom: -15px;
      border-bottom: 1.3px solid #d6d6d6;
      transition: bottom 0.3s ease;
    }

    &.checked:before {
      bottom: 50%;
      position: absolute;
      left: 50px;
      right: 70px;
      border-bottom: 1.5px solid #e8e8e8;
      color: #d6d6d6;
    }

    .left {
      display: flex;
      align-items: center;

      .check {
        background: none;
        width: 30px;
        height: 30px;
        border: 2px solid #d6d6d6;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 20px;
        display: flex;
        justify-content: center;
      }

      .text {
        font-size: 1.2rem;
        color: #555555;
      }

      .text.checked {
        color: #d6d6d6;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .time {
        font-size: 1.2rem;
        color: #555555;
      }

      .time.checked {
        color: #d6d6d6;
      }

      .pen {
        margin-left: 20px;
        cursor: pointer;
      }

      .trash {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .between.checked .left .check {
    border: none;
    display: flex;
    align-items: center;
    color: #d6d6d6;
  }
`;
