import { useEffect, useState } from "react";
import {
  addCalendar,
  getCalendars,
  updateCalendar,
  deleteCalendar,
} from "../../api/calendar";
import Modal from "react-modal";
import { CustomNavi, StyledCalendar } from "./StCalendar";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomAlert from "../../components/alert/CustomAlert";
import CustomConfirm from "../../components/alert/CustomConfirm";

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

function Calendar() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [edit, setEdit] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"month" | "decade" | "year">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
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
  const [loading, setLoading] = useState(true);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getCalendars();
        setSchedules(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedules", error);
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  useEffect(() => {
    console.log(schedules);
    const testDate = new Date("2023-10-29");
    console.log(
      `tileClassName for ${testDate}:`,
      tileClassName({ date: testDate })
    );
  }, [schedules]);

  const isWithinRange = (date: string, startDate: string, endDate: string) => {
    console.log("Date:", date, "Start:", startDate, "End:", endDate);
    return date >= startDate && date <= endDate;
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectMonthAndCloseModal = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month));
    setYearModalOpen(false);
  };

  const selectYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth()));
    setView("decade");
  };

  const isValidForm = () => {
    return Object.values(formData).every((val) => val !== "");
  };

  const handleEditClick = (schedule: Schedule) => {
    if (edit === null) {
      setSelectedSchedule(schedule);
      setFormData({
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        title: schedule.title,
      });
      setEdit(schedule.id);
    } else if (edit === schedule.id) {
      handleUpdate();
      setEdit(null);
    } else {
      setAlertMessage("수정 후 확인을 눌러주세요!");
    }
  };

  const handleSubmit = async () => {
    if (!isValidForm()) {
      setAlertMessage("모든 항목을 입력해주세요.");
      return;
    }
    try {
      const user_id = 1;
      const newSchedule = await addCalendar({ user_id, ...formData });
      setSchedules([...schedules, newSchedule]);
      setCurrentMonth(new Date(currentMonth));
      setForceUpdate((prev) => prev + 1);
      setFormData({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        title: "",
      });
    } catch (error) {
      console.error("Error submitting schedule", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedSchedule) return;

    try {
      await updateCalendar(selectedSchedule.id, formData);
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === selectedSchedule.id
          ? { ...selectedSchedule, ...formData }
          : schedule
      );
      setSchedules(updatedSchedules);
      setFormData({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        title: "",
      });
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
        const updatedSchedules = schedules.filter(
          (schedule) => schedule.id !== selectedSchedule.id
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
    setView("month");
    setYearModalOpen(true);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];

    for (let schedule of schedules) {
      if (isWithinRange(dateString, schedule.startDate, schedule.endDate)) {
        console.log("Matching date:", dateString);
        return "has-schedule";
      }
    }
    return "";
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const dateString = date.toISOString().split("T")[0];
    console.log("Checking date:", dateString); // 추가

    const hasSchedule = schedules.some((schedule) =>
      isWithinRange(dateString, schedule.startDate, schedule.endDate)
    );

    console.log("Has schedule for", dateString, ":", hasSchedule);

    if (hasSchedule) {
      return (
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "red",
            width: "100px",
            height: "100px",
            position: "absolute",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        ></div>
      );
    }
    return null;
  };

  return (
    <>
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
          {view === "month" ? (
            // 년도 선택
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
                  onClick={() => selectYear(year)}
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
          ) : (
            // 월 선택
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
          )}
        </Modal>
      )}

      <StyledCalendar
        darkMode={darkMode}
        key={forceUpdate}
        value={currentMonth}
        onClickDay={(value: Date) => handleDateClick(value)}
        onViewChange={({ view }: { view: string }) => {
          if (view === "year" || view === "month") {
            setView(view);
          }
        }}
        view={view}
        formatMonthYear={(locale: any, date: Date) =>
          `${date.toLocaleString("en-US", {
            month: "long",
          })} ${date.getFullYear()}`
        }
        formatDay={(locale: any, date: Date) => `${date.getDate()}`}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

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
              height: "900px",
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
              추가
            </button>

            <h3
              style={{
                marginBottom: "20px",
                color: "gray",
              }}
            >
              일정 목록
            </h3>
            <div
              style={{
                width: "70%",
                overflowY: "auto",
                maxHeight: "300px",
                borderRadius: "10px",
                border: "1.5px solid #ccd1de",
                padding: "2rem",
              }}
            >
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
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
                      {edit === schedule.id ? "확인" : "수정"}
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
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
export default Calendar;
