import { useEffect, useRef, useState } from "react";
import {
  addCalendar,
  getCalendars,
  updateCalendar,
  deleteCalendar,
} from "../../api/calendar";
import Modal from "react-modal";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomAlert from "../../components/alert/CustomAlert";
import CustomConfirm from "../../components/alert/CustomConfirm";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import Calendar from "react-calendar";

interface Schedule {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  title: string;
  user_id: number;
}

interface FormData {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  title: string;
}

function CalendarView(props: any) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [mark, setMark] = useState<string[]>([]);
  const [edit, setEdit] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"month" | "decade" | "year">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    title: "",
  });
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [yearModalOpen, setYearModalOpen] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { darkMode } = useDarkMode();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [hoveredSchedule, setHoveredSchedule] = useState<Schedule | null>(null);
  const [monthModalOpen, setMonthModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getCalendars();
        const sortedData = data.sort(
          (a: Schedule, b: Schedule) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        setSchedules(sortedData);
        const markedDates = sortedData.map(
          (schedule: Schedule) => schedule.startDate
        );
        setMark(markedDates);
      } catch (error) {
        console.error("Error fetching schedules", error);
      }
    };
    fetchSchedules();
  }, []);

  const updateFilteredSchedules = (dateString: string) => {
    const schedulesForTheDate = schedules.filter(
      (schedule) =>
        dateString >= schedule.startDate && dateString <= schedule.endDate
    );
    setFilteredSchedules(schedulesForTheDate);
  };

  useEffect(() => {
    if (selectedDate) {
      const localDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      updateFilteredSchedules(localDate);
    }
  }, [schedules, selectedDate]);

  const handleAddClick = () => {
    setEdit(null);
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      startDate: today,
      endDate: today,
      startTime: "",
      endTime: "",
      title: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setYearModalOpen(false);
    setMonthModalOpen(true);
  };

  const selectMonthAndCloseModal = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month));
    setMonthModalOpen(false);
  };

  const isValidForm = () => {
    return Object.values(formData).every((val) => val !== "");
  };

  const handleEditClick = (schedule: Schedule) => {
    setEdit(schedule.id);
    setFormData({
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      title: schedule.title,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      setAlertMessage("모든 항목을 입력해주세요.");
      return;
    }

    if (edit !== null) {
      const existingSchedule = schedules.find((s) => s.id === edit);
      if (!existingSchedule) {
        console.error("Schedule not found for editing");
        return;
      }

      const scheduleToUpdate = {
        ...formData,
        id: edit,
        user_id: existingSchedule.user_id,
      };

      await handleUpdate(scheduleToUpdate);
    } else {
      const user_id = 1;
      const newSchedule = await addCalendar({ user_id, ...formData });

      setSchedules((prevSchedules) => {
        const updatedSchedules = [...prevSchedules, newSchedule];
        return updatedSchedules.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });
      setMark((prevMarks) => [...prevMarks, newSchedule.startDate]);
    }
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth())
    );
    setIsModalOpen(false);
  };

  const handleUpdate = async (scheduleToUpdate: Schedule) => {
    if (!scheduleToUpdate) return;

    try {
      await updateCalendar(scheduleToUpdate.id, {
        startDate: scheduleToUpdate.startDate,
        endDate: scheduleToUpdate.endDate,
        startTime: scheduleToUpdate.startTime,
        endTime: scheduleToUpdate.endTime,
        title: scheduleToUpdate.title,
      });

      const updatedSchedules = schedules
        .map((schedule) =>
          schedule.id === scheduleToUpdate.id
            ? { ...schedule, ...scheduleToUpdate }
            : schedule
        )
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error("Error updating schedule", error);
    }
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedSchedule) return;

    try {
      const response = await deleteCalendar(selectedSchedule.id);
      if (response && response.error) {
        setAlertMessage(response.error);
      } else {
        const updatedSchedules = schedules
          .filter((schedule) => schedule.id !== selectedSchedule.id)
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        setSchedules(updatedSchedules);
        setAlertMessage("일정이 성공적으로 삭제되었습니다.");
      }
    } catch (error) {
      console.error("Error deleting schedule", error);
      setAlertMessage("일정 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteConfirmation = () => {
    handleDelete();
    setShowConfirm(false);
  };

  const openYearAndMonthSelection = () => {
    setYearModalOpen(true);
    setView("month");
  };

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

  // 달력 클릭
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    setFormData({
      startDate: localDate,
      endDate: localDate,
      startTime: "",
      endTime: "",
      title: "",
    });

    setIsModalOpen(true);
  };

  useEffect(() => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );

    setSelectedDate(firstDayOfMonth);

    const localDate = firstDayOfMonth.toISOString().split("T")[0];
    updateFilteredSchedules(localDate);
  }, [currentMonth]);

  return (
    <Box>
      <CalendarWrap>
        {alertMessage && (
          <CustomAlert
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
          />
        )}
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
          <span onClick={openYearAndMonthSelection}>
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

        {yearModalOpen && (
          <Modal
            isOpen={yearModalOpen}
            onRequestClose={() => setYearModalOpen(false)}
            closeTimeoutMS={200}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "35%",
                height: "50vh",
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
              },
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                maxWidth: "100%",
                height: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Array.from(
                { length: 12 },
                (_, i) => currentMonth.getFullYear() - 5 + i
              ).map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    selectYear(year);
                    setMonthModalOpen(true);
                    setYearModalOpen(false);
                  }}
                  style={{
                    display: "flex",
                    fontSize: "2rem",
                    whiteSpace: "nowrap",
                    width: "30%",
                    background: "none",
                    cursor: "pointer",
                    color: darkMode ? "white" : "#67686b",
                    transition: "color 0.3s ease",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </Modal>
        )}

        {monthModalOpen && (
          <Modal
            isOpen={monthModalOpen}
            onRequestClose={() => setMonthModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "35%",
                height: "50vh",
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
              },
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                maxWidth: "100%",
                height: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <button
                  key={month}
                  onClick={() => selectMonthAndCloseModal(month - 1)}
                  style={{
                    display: "flex",
                    fontSize: "2rem",
                    whiteSpace: "nowrap",
                    width: "30%",
                    background: "none",
                    cursor: "pointer",
                    color: darkMode ? "white" : "#67686b",
                    transition: "color 0.3s ease",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {month}월
                </button>
              ))}
            </div>
          </Modal>
        )}

        <StyledCalendar darkMode={darkMode} ref={calendarRef}>
          <Calendar
            key={currentMonth.toISOString()}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                const isMarked = schedules.some(
                  (schedule) =>
                    formattedDate >= schedule.startDate &&
                    formattedDate <= schedule.endDate
                );
                return isMarked ? "dot" : "";
              }
              return "";
            }}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const formattedDate = moment(date).format("YYYY-MM-DD");
                const isMarked = schedules.some(
                  (schedule) =>
                    formattedDate >= schedule.startDate &&
                    formattedDate <= schedule.endDate
                );
                if (isMarked) {
                  const scheduleTitle = schedules.find(
                    (schedule) =>
                      formattedDate >= schedule.startDate &&
                      formattedDate <= schedule.endDate
                  )?.title;

                  return (
                    <div className='dot'>
                      <div className='tooltip'>{scheduleTitle}</div>
                    </div>
                  );
                }
              }
              return null;
            }}
            onClickDay={(value: Date) => handleDateClick(value)}
            value={currentMonth}
            onChange={(
              value: any,
              event: React.MouseEvent<HTMLButtonElement>
            ) => {
              if (value instanceof Date) {
                setCurrentMonth(value);
              } else if (Array.isArray(value) && value[0] instanceof Date) {
                setCurrentMonth(value[0]);
              }
            }}
            view={view}
          />
          {hoveredSchedule && (
            <Modal
              isOpen={!!hoveredSchedule}
              onRequestClose={() => setHoveredSchedule(null)}
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  width: "200px",
                  height: "auto",
                  padding: "10px",
                },
              }}
            >
              <div style={{ textAlign: "center" }}>{hoveredSchedule.title}</div>
            </Modal>
          )}
        </StyledCalendar>
      </CalendarWrap>
      <CalendarList darkMode={darkMode}>
        <button onClick={handleAddClick}>일정 추가하기</button>
        {schedules.map((schedule) => (
          <div key={schedule.id} className='schedule-item'>
            <p
              style={{
                fontSize: "1.3rem",
                color: darkMode ? "white" : "#91a5d9",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {schedule.title}
            </p>
            <div
              style={{
                marginBottom: "5px",
                paddingBottom: "20px",
                borderBottom: "1.5px solid #ccd1de",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "gray",
                  marginRight: "30px",
                }}
              >
                {schedule.startDate} - {schedule.endDate}
              </span>
              <button
                onClick={() => handleEditClick(schedule)}
                style={{
                  background: edit === schedule.id ? "#c4c6cc" : "none",
                  marginRight: "10px",
                  cursor: "pointer",
                  width: "90px",
                  height: "40px",
                  border: "2px solid #c4c6cc",
                  color: darkMode ? "white" : "black",
                  fontSize: "1.1rem",
                  borderRadius: "5px",
                }}
              >
                수정
              </button>
              {showConfirm && (
                <CustomConfirm
                  message='기록을 삭제하시겠습니까?'
                  onConfirm={handleDeleteConfirmation}
                  onCancel={() => setShowConfirm(false)}
                />
              )}
              <button
                onClick={() => handleDeleteClick(schedule)}
                style={{
                  background: "none",
                  cursor: "pointer",
                  width: "90px",
                  height: "40px",
                  border: "2px solid #d66851",
                  fontSize: "1.1rem",
                  borderRadius: "5px",
                  color: "#d66851",
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel='Schedule Modal'
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "60%",
                height: "600px",
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
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h3 style={{ marginBottom: "20px", color: "gray" }}>
                일정 추가하기
              </h3>
              <div>
                <input
                  type='date'
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  style={{
                    width: "280px",
                    height: "30px",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                />
                <input
                  type='date'
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  style={{
                    width: "280px",
                    height: "30px",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                />
              </div>

              <div>
                <input
                  type='time'
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  style={{
                    width: "280px",
                    height: "30px",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                />
                <input
                  type='time'
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  style={{
                    width: "280px",
                    height: "30px",
                    padding: "1rem",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                />
              </div>

              <input
                type='text'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder='일정을 추가해주세요.'
                style={{
                  width: "603px",
                  height: "30px",
                  padding: "1rem",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  width: "635px",
                  height: "60px",
                  padding: "1rem",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  marginRight: "10px",
                  fontWeight: "bold",
                  marginBottom: "50px",
                  backgroundColor: darkMode ? "#51439d" : "#91a5d9",
                  color: "white",
                }}
              >
                {edit !== null ? "수정" : "추가"}
              </button>
            </div>
          </Modal>
        )}
      </CalendarList>
    </Box>
  );
}
export default CalendarView;

interface darkProps {
  darkMode: boolean;
}

const Box = styled.div`
  width: 80%;
  height: 100%;
  max-width: 1300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  max-width: 900px;
  height: 90%;
  margin-top: -20px;
  margin-right: 30px;
`;

const CustomNavi = styled.div<darkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#2e2e2e")};

  span {
    cursor: pointer;
    font-family: var(--font-title);
    font-size: 1.5rem;
  }

  button {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    background: #d5dae3;
    border-radius: 50%;
    margin: 0px 60px;
    padding: 0 0 10px 0;
    color: white;
    cursor: pointer;
    font-family: var(--font-title);
  }
`;

const StyledCalendar = styled.div<darkProps>`
  width: 100%;
  border-radius: 40px;

  .react-calendar {
    width: 100%;
    background: ${({ darkMode }) => (darkMode ? "#4e5057" : "#fcfcfc")};
    border: 1px solid #ededed;
  }

  .react-calendar__tile.dot::after {
    content: "";
    position: absolute;
    top: 55px;
    left: 100px;
    width: 10px;
    height: 10px;
    background-color: #91a5d9;
    border-radius: 50%;
  }

  .tooltip {
    position: absolute;
    left: 30px;
    top: 65%;
    transform: translateY(-50%);
    color: #91a5d9;
    width: 100%;
  }

  .tooltip.visible {
    display: block;
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    height: 50px;
    line-height: 30px;
    font-size: 1.1rem;
    border-bottom: 1px solid #e8e8e8;
    font-weight: bold;
    border-radius: 0;
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#d5dae3")};
    color: ${({ darkMode }) => (darkMode ? "white" : "#474747")};
  }

  .react-calendar__tile {
    position: relative;
    height: 120px;
    background: white;
    cursor: pointer;
    background: none;
    font-size: 1.1rem;
    border-bottom: 1px solid #e8e8e8;
    color: ${({ darkMode }) => (darkMode ? "white" : "#2e2e2e")};
  }

  .react-calendar__month-view__weekdays {
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .react-calendar__month-view__days__day {
    border-right: 1px solid #e8e8e8;
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

  .react-calendar__tile {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 15px;
    position: relative;
  }

  .react-calendar__tile--now {
    background: none;
    z-index: 0;
  }

  .react-calendar__tile--now::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    background-color: #bccaee;
    border-radius: 40px;
    border: 2px solid #b3c1e3;
    z-index: -1;
    opacity: 80%;
  }

  .react-calendar__year-view__months__month {
    height: auto;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    background: ${({ darkMode }) => (darkMode ? "#323336" : "#f5f5f5")};
    color: ${({ darkMode }) => (darkMode ? "white" : "#cccccc")};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
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
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .year-button:hover {
    background-color: #d5dae3;
  }
`;

const CalendarList = styled.div<darkProps>`
  width: 40%;
  max-width: 350px;
  height: 100%;
  background: ${({ darkMode }) => (darkMode ? "#333" : "#f5f5f5")};
  padding: 20px;
  border-radius: 25px;
  overflow-y: auto;
  max-height: 760px;

  .schedule-item {
    background: ${({ darkMode }) => (darkMode ? "#4e5057" : "#f9f9f9")};
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  button {
    width: 100%;
    height: 50px;
    background: #91a5d9;
    color: white;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
