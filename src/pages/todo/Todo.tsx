import { useEffect, useState } from "react";
import { TodoTop, TodoWrap, Todos } from "./StTodo";
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

  // 날짜,요일
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

  // 모달
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
    } catch (error) {
      console.error(error);
      alert("항목을 추가하는 데 실패하였습니다.");
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

        // 서버로부터 가져온 completed 상태를 사용하여 checkedTodoIds 초기화
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

  return (
    <>
      <TodoWrap>
        <TodoTop>
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
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "900px",
              height: "230px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#d4d4d4",
              border: "none",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            },
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#858087",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              fontSize: "1.3rem",
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
              width: "600px",
              height: "70px",
              backgroundColor: "white",
              paddingLeft: "1rem",
              fontSize: "1.2rem",
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddTodo();
            }}
          />
          <button
            className='AddBtn'
            style={{
              width: "150px",
              height: "70px",
              fontSize: "1.2rem",
              cursor: "pointer",
              backgroundColor: "#51439d",
              color: "white",
            }}
            onClick={handleAddTodo}
          >
            {editTodoId !== null ? "수정하기" : "추가하기"}
          </button>
        </Modal>

        <Todos>
          {todos.map((todo) => (
            <div
              className={`between ${
                checkedTodoIds.includes(todo.todo_id) ? "checked" : ""
              }`}
              key={todo.todo_id}
            >
              <div className='left'>
                <div
                  className='check'
                  onClick={() => handleToggleCheck(todo.todo_id)}
                >
                  {checkedTodoIds.includes(todo.todo_id) ? (
                    <BsCheckLg size='35' color='#51439d' />
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
          ))}
        </Todos>
      </TodoWrap>
    </>
  );
}

export default Todo;
