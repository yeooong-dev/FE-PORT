import { useEffect, useRef, useState } from "react";
import { applyForLeave, deleteLeave, getLeavesForDate } from "../../api/leave";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import moment from "moment";
import UseUser from "../../hook/UseUser";

interface Leave {
  id: number;
  date: string;
  userId: number;
  status: "APPROVED" | "PENDING" | "DENIED";
  User?: {
    name: string;
  };
}

function Vacation() {
  const [date, setDate] = useState<Date>(new Date());
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const { user } = UseUser();
  const [userId, setUserId] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { darkMode } = useDarkMode();
  const [tileSize, setTileSize] = useState(0);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [monthLeavesInfo, setMonthLeavesInfo] = useState<{
    [dateString: string]: boolean;
  }>({});

  useEffect(() => {
    fetchLeaves();
  }, [date]);

  useEffect(() => {
    if (user && user.id) {
      setUserId(parseInt(user.id));
    }
  }, [user]);

  const fetchLeaves = async () => {
    try {
      const dateString = moment(date).tz("Asia/Seoul").format("YYYY-MM-DD");
      const fetchedLeaves = await getLeavesForDate(new Date(dateString));
      setLeaves(fetchedLeaves);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTileSize = () => {
    if (calendarRef.current) {
      const calendarWidth = calendarRef.current.offsetWidth;
      const size = Math.floor(calendarWidth / 7);
      setTileSize(size);
    }
  };

  useEffect(() => {
    updateTileSize();
    window.addEventListener("resize", updateTileSize);

    return () => {
      window.removeEventListener("resize", updateTileSize);
    };
  }, []);

  // "일" 없애기
  useEffect(() => {
    const removeDaySuffix = () => {
      if (calendarRef.current) {
        const calendarDays = Array.from(
          calendarRef.current.querySelectorAll(".react-calendar__tile abbr")
        );
        calendarDays.forEach((dayElement) => {
          const dayText = dayElement.textContent;
          if (dayText) {
            dayElement.textContent = dayText.replace(/일$/, "");
          }
        });
      }
    };

    removeDaySuffix();
  }, [currentMonth]);

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const fetchLeavesForMonth = async () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const leavesPromises = [];

    for (
      let day = new Date(startOfMonth);
      day <= endOfMonth;
      day.setDate(day.getDate() + 1)
    ) {
      leavesPromises.push(getLeavesForDate(new Date(day)));
    }

    try {
      const results = await Promise.all(leavesPromises);
      const monthlyLeaves = results.flat();

      const newMonthLeavesInfo: { [dateString: string]: boolean } = {};

      for (
        let day = new Date(startOfMonth);
        day <= endOfMonth;
        day.setDate(day.getDate() + 1)
      ) {
        const dayString = day.toISOString().split("T")[0];
        newMonthLeavesInfo[dayString] =
          monthlyLeaves
            .filter((leave) => {
              // 서버에서 받은 날짜를 로컬 시간대로 변환
              const leaveDateLocal = moment(leave.date)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DD");
              return leaveDateLocal === dayString;
            })
            .map((leave) => leave.userId)
            .filter((userId, index, array) => array.indexOf(userId) === index)
            .length >= 2;
      }
      setMonthLeavesInfo(newMonthLeavesInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeavesForMonth();
  }, [currentMonth]);

  const hasAppliedThisMonth = (userId: number) => {
    if (userId === null) return false;

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    return (
      leaves.filter(
        (leave) =>
          leave.userId === userId &&
          new Date(leave.date).getMonth() === currentMonth &&
          new Date(leave.date).getFullYear() === currentYear
      ).length >= 1
    );
  };

  const handleDateApply = async (selectedDate: string) => {
    const applyConfirmation = window.confirm("이 날짜에 신청하시겠습니까?");
    if (!applyConfirmation) {
      return;
    }

    if (moment(selectedDate).isBefore(moment().format("YYYY-MM-DD"))) {
      alert("해당 날짜엔 신청할 수 없습니다.");
      return;
    }

    if (userId === null) {
      alert("사용자 ID를 확인할 수 없습니다.");
      return;
    }

    if (hasAppliedThisMonth(userId)) {
      alert("한달에 한번만 신청 가능합니다.");
      return;
    }

    if (monthLeavesInfo[selectedDate]) {
      alert("이 날짜에는 더 이상 신청할 수 없습니다.");
      return;
    }

    try {
      await applyForLeave(new Date(selectedDate), userId);
      await fetchLeaves();
      await fetchLeavesForMonth();
    } catch (error) {
      alert("신청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleDeleteLeave = async (leaveId: number) => {
    const confirmDelete = window.confirm("연차 신청을 취소하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteLeave(leaveId);
        await fetchLeaves();
        await fetchLeavesForMonth();
      } catch (error) {
        console.error("Error deleting leave:", error);
        alert("취소 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Wrap>
      <CustomNavi darkMode={darkMode}>
        <button
          onClick={() => {
            setCurrentMonth(
              (prevMonth) =>
                new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
            );
          }}
        >
          &lt;
        </button>
        <span>
          {currentMonth.getFullYear()}
          {"."}
          {currentMonth.toLocaleString("ko", { month: "long" })}
        </span>
        <button
          onClick={() => {
            setCurrentMonth(
              (prevMonth) =>
                new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
            );
          }}
        >
          &gt;
        </button>
      </CustomNavi>

      <StyledCalendar darkMode={darkMode} tileSize={tileSize} ref={calendarRef}>
        <Calendar
          onChange={(
            value: any,
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => {
            if (value) {
              const selectedDate = Array.isArray(value) ? value[0] : value;
              setDate(selectedDate);
            }
          }}
          value={date}
          activeStartDate={currentMonth}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              // 과거 날짜 확인
              const isPast = isPastDate(date);
              // 주말 확인 (0: 일요일, 6: 토요일)
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              if (isPast || isWeekend) {
                return "past-date"; // 과거 또는 주말에 해당하는 타일에 'past-date' 클래스 적용
              }
            }
            return null;
          }}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const dateString = moment(date)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DD");

              // 현재 표시 중인 달에 속하는지 확인
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth() &&
                date.getFullYear() === currentMonth.getFullYear();

              if (
                isCurrentMonth &&
                monthLeavesInfo[dateString] &&
                !isPastDate(date)
              ) {
                // 현재 달이고 과거 날짜가 아닌 경우에만 마감 표시
                return <div className='close'>마감</div>;
              } else if (isCurrentMonth && !isPastDate(date) && !isWeekend) {
                // 현재 달이고 과거 날짜가 아니고 주말이 아닌 경우에만 '신청' 버튼 표시
                return (
                  <div
                    onClick={() => handleDateApply(dateString)}
                    className='apply'
                  >
                    신청
                  </div>
                );
              }
            }
          }}
        />

        <VacationList darkMode={darkMode}>
          {leaves.length === 0 ? (
            <p>신청내역이 없습니다.</p>
          ) : (
            <>
              {leaves.map((leave) => (
                <div key={leave.id}>
                  {leave.User?.name} {leave.date}
                  {leave.userId === userId ? (
                    <button onClick={() => handleDeleteLeave(leave.id)}>
                      취소
                    </button>
                  ) : (
                    <span className='button-placeholder'></span>
                  )}
                </div>
              ))}
            </>
          )}
        </VacationList>
      </StyledCalendar>
    </Wrap>
  );
}

export default Vacation;

interface StyledCalendarProps extends darkProps {
  tileSize: number;
  darkMode: boolean;
}

interface darkProps {
  darkMode: boolean;
}

const Wrap = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CustomNavi = styled.div<darkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: bold;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#2e2e2e")};
  padding: 30px 0;

  span {
    font-family: var(--font-title);
    font-size: 1.2rem;
  }

  button {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    background: none;
    margin: -7px 20px;
    color: #a3a3a3;
    cursor: pointer;
    font-family: var(--font-title);
  }

  @media (max-width: 550px) {
    height: 0px;
    margin-top: 10px;
    margin-bottom: 10px;

    span {
      font-size: 1rem;
      width: 100%;
    }

    button {
      margin: -10px 20px;
    }
  }
`;

const VacationList = styled.div<darkProps>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    margin: 5px 0;
  }

  button {
    width: 40px;
    height: 30px;
    background: #d43a2f;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 8px;
  }
`;

const StyledCalendar = styled.div<StyledCalendarProps>`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 40px;

  .react-calendar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ darkMode }) => (darkMode ? "#2e2e2e" : "#fcfcfc")};
    border: ${({ darkMode }) =>
      darkMode ? "1px solid #333333" : "1px solid #ededed"};
    margin-bottom: 20px;

    .apply {
      color: #3069db;
      cursor: pointer;
      margin-top: 8px;
    }

    .close {
      color: #d43a2f;
      cursor: pointer;
      margin-top: 8px;
    }
  }

  .react-calendar__tile.past-date,
  .react-calendar__tile.weekend {
    pointer-events: none;
  }

  .react-calendar__tile.past-date:hover,
  .react-calendar__tile.weekend:hover {
    background: none !important;
    cursor: default !important;
  }

  .react-calendar__tile.past-date {
    position: relative;
    overflow: hidden;
    z-index: 9;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .react-calendar__tile.past-date::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    height: 100%;
    width: 200%;
    z-index: -1;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    background: ${({ darkMode }) =>
      darkMode
        ? "repeating-linear-gradient(-45deg, transparent, #363636 8px, #f1f1f1 6px, #363636 6px)"
        : "repeating-linear-gradient(-45deg, transparent, #f1f1f1 5px, #f1f1f1 6px, #f1f1f1 6px)"};
  }

  .tooltip {
    position: absolute;
    left: 0;
    bottom: 7px;
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#3c57b3")};
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    z-index: 0;
  }

  .start {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 5px;
    height: 30px;
    background: #3c57b3;
  }

  .tooltip.visible {
    display: block;
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    height: 45px;
    line-height: 30px;
    font-size: 1.1rem;
    border-bottom: ${({ darkMode }) =>
      darkMode ? "0.8px solid #333333" : "0.8px solid #e3e3e3"};
    font-weight: bold;
    border-radius: 0;
    background: ${({ darkMode }) => (darkMode ? "#aaadb5" : "#e9eaf2")};
    color: ${({ darkMode }) => (darkMode ? "white" : "#474747")};
  }

  .react-calendar__tile {
    position: relative;
    width: 120px;
    height: ${(props) => props.tileSize}px;
    min-height: 38px;
    cursor: pointer;
    background: none;
    font-size: 1.1rem;
    font-weight: bold;
    border-bottom: 1px solid #e3e3e3;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 12px;
  }

  .react-calendar__month-view__days__day {
    border: ${({ darkMode }) =>
      darkMode ? "0.8px solid #333333" : "0.8px solid #e3e3e3"};
  }

  .react-calendar__month-view__days__day:nth-child(7),
  .react-calendar__month-view__days__day:nth-child(14),
  .react-calendar__month-view__days__day:nth-child(21),
  .react-calendar__month-view__days__day:nth-child(35),
  .react-calendar__month-view__days__day:nth-child(28),
  .react-calendar__month-view__days__day:nth-child(42) {
    border-right: none;
  }

  .react-calendar__month-view__days__day:nth-last-child(7),
  .react-calendar__month-view__days__day:nth-last-child(5),
  .react-calendar__month-view__days__day:nth-last-child(6),
  .react-calendar__month-view__days__day:nth-last-child(4),
  .react-calendar__month-view__days__day:nth-last-child(3),
  .react-calendar__month-view__days__day:nth-last-child(2),
  .react-calendar__month-view__days__day:nth-last-child(1) {
    border-bottom: none;
  }

  .react-calendar__tile--now {
    background: none;
    z-index: 0;
  }

  .react-calendar__tile--now::before {
    content: "";
    position: absolute;
    top: 5px;
    right: 6.5px;
    width: 30px;
    height: 30px;
    background-color: #3c57b3;
    border-radius: 40px;
    border: 2px solid #b3c1e3;
    z-index: -1;
    opacity: 50%;
  }

  .react-calendar__year-view__months__month {
    height: auto;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ darkMode }) => (darkMode ? "#616161" : "#f5f5f5")};
    color: black;
  }

  .year-modal-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
  }

  .year-button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #f6f6f6;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  @media (max-width: 550px) {
    .react-calendar__month-view__weekdays__weekday {
      font-size: 1rem;
    }

    .react-calendar__tile {
      padding: 10px;
      font-size: 14px;
    }

    .react-calendar__tile--now::before {
      top: 8px;
      right: 7px;
      width: 20px;
      height: 20px;
    }

    .react-calendar__tile.dot::after {
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 10px;
      background-color: #91a5d9;
      opacity: 20%;
    }

    .tooltip {
      display: none;
    }

    .start {
      height: 10px;
    }
  }

  @media (max-width: 500px) {
    .react-calendar {
      .apply {
        margin-top: 3px;
      }

      .close {
        margin-top: 3px;
      }
    }

    .react-calendar__tile--now::before {
      right: 7.5px;
    }
  }

  @media (max-width: 420px) {
    .react-calendar__tile {
      padding: 5px;
    }

    .react-calendar {
      .apply {
        font-size: 12px;
        margin-top: 2px;
      }

      .close {
        font-size: 12px;
        margin-top: 2px;
      }
    }

    .react-calendar__tile--now::before {
      top: 4px;
      right: 3.5px;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 340px) {
    .react-calendar {
      .apply {
        margin-top: 0px;
      }

      .close {
        margin-top: 0px;
      }
    }
  }
`;
