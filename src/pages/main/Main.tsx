import { Link } from "react-router-dom";
import { CheckDiv, SchedulesList, Wrap, WrapCalendar, WrapEvent, WrapLeft, WrapRight, WrapTodo } from "./StMain";
import { useEffect, useState } from "react";
import { todoGet, todoToggleCheck } from "../../api/todo";
import { getAllFamilyEvents } from "../../api/familyEvents";
import { BsCheckLg } from "react-icons/bs";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CalendarView from "../calendar/CalendarView";
import { getCalendars } from "../../api/calendar";
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

export interface Schedule {
    id: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    title: string;
    user_id: number;
}

function Main() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [events, setEvents] = useState<FamilyEventItem[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
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
        fetchSchedules();
    }, []);

    const handleToggleCheck = async (id: number) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (todoToUpdate) {
            const updatedTodo = {
                ...todoToUpdate,
                completed: !todoToUpdate.completed,
            };

            try {
                await todoToggleCheck(id);

                setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
            } catch (error) {
                console.error("Error updating check status:", error);
            }
        }
    };

    const fetchSchedules = async () => {
        try {
            const data = await getCalendars();
            setSchedules(data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    return (
        <Wrap>
            <WrapLeft>
                <WrapTodo darkMode={darkMode}>
                    <div className='todolist'>
                        <Link to='/todo'>
                            <h1>오늘의 할 일 &nbsp; {">"}</h1>
                        </Link>
                        {todos.map((todo) => (
                            <div key={todo.todo_id} className='todoItem'>
                                <CheckDiv
                                    className={todo.completed ? "checked" : ""}
                                    onClick={() => handleToggleCheck(todo.todo_id)}
                                >
                                    {todo.completed ? <BsCheckLg size='35' color='#3c57b3' /> : null}
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
                    <div className='event'>
                        <Link to='/event'>
                            <h1>경조사 기록 내역 &nbsp; {">"}</h1>
                        </Link>
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

            <WrapRight darkMode={darkMode}>
                <WrapCalendar darkMode={darkMode}>
                    <div>
                        <CalendarView showOnlyCalendar={true} />
                    </div>
                </WrapCalendar>
                <SchedulesList darkMode={darkMode}>
                    {schedules.map((schedule) => (
                        <div key={schedule.id} className='schedule-item'>
                            <p>{schedule.title}</p>
                            <p>
                                {schedule.startDate} - {schedule.endDate}
                            </p>
                        </div>
                    ))}
                </SchedulesList>
            </WrapRight>
        </Wrap>
    );
}

export default Main;
