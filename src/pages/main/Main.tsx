import { Link } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import {
  CheckDiv,
  Wrap,
  WrapCalendar,
  WrapEvent,
  WrapLeft,
  WrapRight,
  WrapTodo,
} from "./StMain";
import { useEffect, useState } from "react";
import { todoGet, todoToggleCheck } from "../../api/todo";
import { getAllFamilyEvents } from "../../api/familyEvents";
import { BsCheckLg } from "react-icons/bs";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";

export interface TodoItem {
  id: number;
  text: string;
  time: string;
  todo_id: number;
  completed: boolean;
}

export interface FamilyEventItem {
  id: number;
  target: string;
  date: string;
  type: string;
  amount: number;
}

function Main() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [events, setEvents] = useState<FamilyEventItem[]>([]);
  const { darkMode } = useDarkMode();

  const fetchTodos = async () => {
    try {
      const response = await todoGet();
      if (response && Array.isArray(response)) {
        setTodos(response);
      } else {
        console.error("서버에서 예상한 형식의 응답이 아닙니다.");
      }
    } catch (error) {
      console.error("Todos fetching failed:", error);
    }
  };

  const fetchFamilyEvents = async () => {
    try {
      const response = await getAllFamilyEvents();
      if (response && Array.isArray(response)) {
        setEvents(response);
      } else {
        console.error("서버에서 예상한 형식의 응답이 아닙니다.");
      }
    } catch (error) {
      console.error("Family events fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchFamilyEvents();
  }, []);

  const handleToggleCheck = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.todo_id === id);
    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      try {
        await todoToggleCheck(id);

        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.todo_id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.error("Error updating check status:", error);
      }
    }
  };

  return (
    <Wrap>
      <WrapLeft>
        <WrapTodo darkMode={darkMode}>
          <Link to='/todo'>
            <h1>오늘의 할 일 &nbsp; {">"}</h1>
          </Link>
          <div className='todolist'>
            {todos.map((todo) => (
              <div key={todo.todo_id} className='todoItem'>
                <CheckDiv
                  className={todo.completed ? "checked" : ""}
                  onClick={() => handleToggleCheck(todo.todo_id)}
                >
                  {todo.completed ? (
                    <BsCheckLg size='35' color='#51439d' />
                  ) : null}
                </CheckDiv>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        </WrapTodo>

        <WrapEvent darkMode={darkMode}>
          <Link to='/event'>
            <h1>경조사 기록 내역 &nbsp; {">"}</h1>
          </Link>
          <div className='event'>
            <div className='eventHeaders'>
              <span className='who'>경조사 대상</span>
              <span className='date'>경조사 날짜</span>
              <span className='type'>경조사 유형</span>
              <span className='amount'>경조사 금액</span>
            </div>
            {events.map((event) => (
              <div key={event.id} className='eventItem'>
                <span className='who'>{event.target}</span>
                <span className='date'>{event.date.split("T")[0]}</span>
                <span className='type'>{event.type}</span>
                <span className='amount'>{event.amount}원</span>
              </div>
            ))}
          </div>
        </WrapEvent>
      </WrapLeft>

      <WrapRight>
        <WrapCalendar darkMode={darkMode}>
          <Link to='/calendar'>
            <h1>나의 일정 &nbsp; {">"}</h1>
          </Link>
          <Calendar />
        </WrapCalendar>
      </WrapRight>
    </Wrap>
  );
}

export default Main;
