import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil, BsCheckLg } from "react-icons/bs";
import {
  todoAdd,
  todoDelete,
  todoGet,
  todoToggleCheck,
  todoUpdate,
} from "../../api/todo";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomAlert from "../../components/alert/CustomAlert";
import styled from "styled-components";
Modal.setAppElement("#root");

interface TodoItem {
  id: number;
  text: string;
  time: string;
  todo_id: number;
}
function Todo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [checkedTodoIds, setCheckedTodoIds] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { darkMode } = useDarkMode();
  const EndRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[currentDate.getDay()];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (id: number, text: string) => {
    setInputValue(text);
    setEditTodoId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setInputValue("");
    setEditTodoId(null);
    setIsModalOpen(false);
  };

  // 추가
  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;

    try {
      if (editTodoId !== null) {
        const updatedTodo = await todoUpdate(editTodoId, {
          text: inputValue,
          completed: false,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.todo_id === editTodoId ? updatedTodo : todo
          )
        );
      } else {
        const newTodo = await todoAdd({ text: inputValue, completed: false });
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }

      setInputValue("");
      setEditTodoId(null);
      setIsModalOpen(false);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error(error);
      setAlertMessage("항목을 추가하는 데 실패하였습니다.");
    }
  };

  // 삭제
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoDelete(id);
      const updatedTodos = await todoGet();
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCheck = async (id: number) => {
    try {
      const updatedTodo = await todoToggleCheck(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.todo_id === id ? updatedTodo : todo))
      );

      if (checkedTodoIds.includes(id)) {
        setCheckedTodoIds((prev) => prev.filter((todoId) => todoId !== id));
      } else {
        setCheckedTodoIds((prev) => [...prev, id]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await todoGet();
        if (!response || !Array.isArray(response)) {
          throw new Error("서버에서 예상한 형식의 응답이 아닙니다.");
        }
        setTodos(response);

        const initialCheckedTodoIds = response
          .filter((todo) => todo.completed)
          .map((todo) => todo.todo_id);
        setCheckedTodoIds(initialCheckedTodoIds);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching todos:", error.message);
        }
      }
    }

    fetchTodos();
  }, []);

  const scrollToBottom = () => {
    EndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
      <TodoWrap darkMode={darkMode}>
        <TodoTop darkMode={darkMode}>
          <div>
            <p className='date'>{`${dayName} ,${currentDate.getFullYear()}.${
              currentDate.getMonth() + 1
            }.${currentDate.getDate()}`}</p>
            <p className='num'>{todos.length} tasks</p>
          </div>

          <button onClick={openModal}>+</button>
        </TodoTop>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className='modal'
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: "999",
            },
            content: {
              width: "80%",
              maxWidth: "450px",
              height: "80%",
              maxHeight: "500px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: darkMode ? "#333" : "#f6f6f6",
              border: "none",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            },
          }}
        >
          <h1
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translate(-50%, 0)",
              fontSize: "1.2rem",
              color: darkMode ? "white" : "black",
            }}
          >
            {editTodoId !== null ? "할일 수정" : "할일 추가"}
          </h1>
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#858087",
              border: "none",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              fontSize: "1rem",
              cursor: "pointer",
              color: "white",
            }}
            onClick={closeModal}
          >
            X
          </button>

          <input
            autoFocus
            style={{
              width: "70%",
              minWidth: "100px",
              height: "55px",
              backgroundColor: "#f0f0f0",
              paddingLeft: "1rem",
              fontSize: "14px",
              marginBottom: "20px",
            }}
            value={inputValue}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length <= 30) {
                setInputValue(newValue);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddTodo();
            }}
            placeholder='30글자 이내로 작성바랍니다.'
          />

          <button
            className='AddBtn'
            style={{
              minWidth: "78%",
              height: "50px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#3c57b3",
              color: "white",
              borderRadius: "10px",
            }}
            onClick={handleAddTodo}
          >
            {editTodoId !== null ? "수정" : "저장"}
          </button>
        </Modal>

        <Todos darkMode={darkMode}>
          {todos.length === 0 ? (
            <b>오늘의 할일을 추가해주세요!</b>
          ) : (
            todos.map((todo) => (
              <div
                className={`between ${
                  checkedTodoIds.includes(todo.todo_id) ? "checked" : ""
                }`}
                key={todo.todo_id}
                ref={EndRef}
              >
                <div className='left'>
                  <div
                    className='check'
                    onClick={() => handleToggleCheck(todo.todo_id)}
                  >
                    {checkedTodoIds.includes(todo.todo_id) ? (
                      <BsCheckLg size='35' color='#3c57b3' />
                    ) : null}
                  </div>
                  <span
                    className={`text ${
                      checkedTodoIds.includes(todo.todo_id) ? "checked" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <div className='right'>
                  <span
                    className={`time ${
                      checkedTodoIds.includes(todo.todo_id) ? "checked" : ""
                    }`}
                  >
                    {todo.time}
                  </span>
                  <BsPencil
                    size='23'
                    className='pen'
                    onClick={() => openEditModal(todo.todo_id, todo.text)}
                  />
                  <IoTrashOutline
                    className='trash'
                    size='25'
                    onClick={() => handleDeleteTodo(todo.todo_id)}
                  />
                </div>
              </div>
            ))
          )}
        </Todos>
      </TodoWrap>
    </>
  );
}

export default Todo;

interface darkProps {
  darkMode: boolean;
}

const TodoWrap = styled.div<darkProps>`
  width: 80%;
  max-width: 1300px;
  height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
  border-radius: 5px;
`;

const TodoTop = styled.div<darkProps>`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    text-align: left;

    .date {
      font-size: 1.6rem;
      font-weight: 900;
      margin-bottom: 20px;
      color: ${({ darkMode }) => (darkMode ? "white" : "#777777")};
    }
    .num {
      font-size: 1.3rem;
      font-weight: bold;
      color: ${({ darkMode }) => (darkMode ? "white" : "#3c57b3")};
    }
  }

  button {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #3c57b3;
    color: white;
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      background: none;
      border: 5px solid #3c57b3;
      transition: 0.5s;
      color: #3c57b3;
    }
  }

  @media (max-width: 550px) {
    width: 95%;

    div {
      .date {
        font-size: 1.3rem;
        margin-bottom: 10px;
      }
    }

    button {
      width: 50px;
      height: 50px;
      min-width: 50px;
      min-height: 50px;

      &:hover {
        background: #3c57b3;
        border: none;
        color: white;
      }
    }
  }
`;

const Todos = styled.div<darkProps>`
  width: 80%;
  max-width: 1300px;
  height: 580px;
  max-height: 580px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
  overflow-y: auto;

  b {
    font-size: 1.4rem;
    margin-top: 100px;
    color: ${({ darkMode }) => (darkMode ? "white" : "#777777")};
  }

  .between {
    width: 100%;
    height: auto;
    min-height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;

    &:before {
      content: "";
      position: absolute;
      left: 0px;
      right: 0;
      bottom: 0;
      border-bottom: ${({ darkMode }) =>
        darkMode ? "1.5px solid #616161" : "1.5px solid #d6d6d6"};
      transition: bottom 0.3s ease;
      width: 100%;
    }

    &.checked:before {
      bottom: 50%;
      position: absolute;
      left: 40px;
      right: 70px;
      border-bottom: ${({ darkMode }) =>
        darkMode ? "1.5px solid #616161" : "1.5px solid #e8e8e8"};
      color: #d6d6d6;
      width: 86%;
    }

    .left {
      display: flex;
      align-items: center;

      .check {
        background: none;
        width: 30px;
        height: 30px;
        max-width: 30px;
        min-width: 30px;
        border: 2px solid #3c57b3;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 20px;
        display: flex;
        justify-content: center;
      }

      .text {
        width: 100%;
        font-size: 1.2rem;
        color: ${({ darkMode }) => (darkMode ? "white" : "#555555")};
        font-weight: bold;
        text-align: left;
        line-height: 25px;
        word-break: break-all;
      }

      .text.checked {
        color: ${({ darkMode }) => (darkMode ? "#616161" : "#d6d6d6")};
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
        width: 50px;
        cursor: pointer;
        padding-left: 20px;
        z-index: 3;
        background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
      }

      .pen:hover {
        color: #3c57b3;
        transition: 0.3s;
      }

      .trash {
        width: 60px;
        background: ${({ darkMode }) => (darkMode ? "#222327" : "white")};
        margin-left: 0px;
        cursor: pointer;
        z-index: 3;
      }

      .trash:hover {
        color: #3c57b3;
        transition: 0.3s;
      }
    }
  }

  .between.checked .left .check {
    border: none;
    display: flex;
    align-items: center;
    color: #d6d6d6;
  }

  @media (max-width: 550px) {
    width: 100%;
    height: 650px;
    max-height: 650px;
    margin-top: 50px;

    b {
      font-size: 16px;
    }

    .between {
      height: auto;
      margin-bottom: 10px;
      overflow: hidden;

      &:before {
        bottom: 0;
      }

      .left {
        .text {
          width: 100%;
          font-size: 14px;
          font-weight: bold;
          line-height: 17px;
        }

        .check {
          width: 20px;
          height: 20px;
          min-width: 20px;
          margin-right: 10px;
        }
      }

      .right {
        .time {
          font-size: 1.2rem;
          color: #555555;
        }

        .time.checked {
          color: #d6d6d6;
        }

        .pen {
          width: 25px;
          padding-left: 8px;
        }

        .pen:hover {
          color: ${({ darkMode }) => (darkMode ? "white" : "#222327")};
        }

        .trash {
          width: 25px;
          padding-left: 10px;
        }

        .trash:hover {
          color: ${({ darkMode }) => (darkMode ? "white" : "#222327")};
        }
      }
    }
  }
`;
