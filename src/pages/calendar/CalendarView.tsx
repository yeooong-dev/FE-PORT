import { useEffect, useRef, useState } from "react";
import { addCalendar, getCalendars, updateCalendar, deleteCalendar } from "../../api/calendar";
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

function CalendarView({ showOnlyCalendar = false }) {
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
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [yearModalOpen, setYearModalOpen] = useState(false);
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const { darkMode } = useDarkMode();
    const calendarRef = useRef<HTMLDivElement>(null);
    const [hoveredSchedule, setHoveredSchedule] = useState<Schedule | null>(null);
    const [monthModalOpen, setMonthModalOpen] = useState(false);
    const [tileSize, setTileSize] = useState(0);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await getCalendars();
                const sortedData = data.sort(
                    (a: Schedule, b: Schedule) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                );
                setSchedules(sortedData);
                const markedDates = sortedData.map((schedule: Schedule) => schedule.startDate);
                setMark(markedDates);
            } catch (error) {
                console.error("Error fetching schedules", error);
            }
        };
        fetchSchedules();
    }, []);

    const updateFilteredSchedules = (dateString: string) => {
        const schedulesForTheDate = schedules.filter(
            (schedule) => dateString >= schedule.startDate && dateString <= schedule.endDate
        );
        setFilteredSchedules(schedulesForTheDate);
    };

    useEffect(() => {
        if (selectedDate) {
            const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
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
                    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
                );
            });
            setMark((prevMarks) => [...prevMarks, newSchedule.startDate]);
        }
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()));
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
                    schedule.id === scheduleToUpdate.id ? { ...schedule, ...scheduleToUpdate } : schedule
                )
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
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
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
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
                const calendarDays = Array.from(calendarRef.current.querySelectorAll(".react-calendar__tile abbr"));
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
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];

        setFormData({
            startDate: localDate,
            endDate: localDate,
            startTime: "",
            endTime: "",
            title: "",
        });
        setEdit(null);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

        setSelectedDate(firstDayOfMonth);

        const localDate = firstDayOfMonth.toISOString().split("T")[0];
        updateFilteredSchedules(localDate);
    }, [currentMonth]);

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

    const truncateTitle = (title: any) => {
        const maxLength = 5;
        return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    };

    if (showOnlyCalendar) {
        return (
            <Box>
                <div className='scroll'>
                    <CalendarWrap darkMode={darkMode}>
                        {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}
                        <CustomNavi darkMode={darkMode}>
                            <button
                                onClick={() => {
                                    setCurrentMonth(
                                        (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
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
                                        (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
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
                                        zIndex: "999",
                                    },
                                    content: {
                                        width: "70%",
                                        maxWidth: "500px",
                                        height: "40vh",
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
                                    {Array.from({ length: 12 }, (_, i) => currentMonth.getFullYear() - 5 + i).map(
                                        (year) => (
                                            <button
                                                key={year}
                                                onClick={() => {
                                                    selectYear(year);
                                                    setMonthModalOpen(true);
                                                    setYearModalOpen(false);
                                                }}
                                                style={{
                                                    display: "flex",
                                                    fontSize: "1.5rem",
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
                                        )
                                    )}
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
                                        zIndex: "999",
                                    },
                                    content: {
                                        width: "70%",
                                        maxWidth: "500px",
                                        height: "40vh",
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
                                                fontSize: "1.5rem",
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

                        <StyledCalendar darkMode={darkMode} tileSize={tileSize} ref={calendarRef}>
                            <Calendar
                                key={currentMonth.toISOString()}
                                onClickDay={(value: Date) => handleDateClick(value)}
                                value={currentMonth}
                                onChange={(value: any, event: React.MouseEvent<HTMLButtonElement>) => {
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
                </div>
            </Box>
        );
    }

    return (
        <Box>
            <div className='scroll'>
                <CalendarWrap darkMode={darkMode}>
                    {alertMessage && <CustomAlert message={alertMessage} onClose={() => setAlertMessage(null)} />}
                    <CustomNavi darkMode={darkMode}>
                        <button
                            onClick={() => {
                                setCurrentMonth(
                                    (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1)
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
                                    (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1)
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
                                    zIndex: "999",
                                },
                                content: {
                                    width: "70%",
                                    maxWidth: "500px",
                                    height: "40vh",
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
                                {Array.from({ length: 12 }, (_, i) => currentMonth.getFullYear() - 5 + i).map(
                                    (year) => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                selectYear(year);
                                                setMonthModalOpen(true);
                                                setYearModalOpen(false);
                                            }}
                                            style={{
                                                display: "flex",
                                                fontSize: "1.4rem",
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
                                    )
                                )}
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
                                    zIndex: "999",
                                },
                                content: {
                                    width: "70%",
                                    maxWidth: "500px",
                                    height: "40vh",
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
                                            fontSize: "1.4rem",
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

                    <StyledCalendar darkMode={darkMode} tileSize={tileSize} ref={calendarRef}>
                        <Calendar
                            key={currentMonth.toISOString()}
                            tileClassName={({ date, view }) => {
                                if (view === "month") {
                                    const formattedDate = moment(date).format("YYYY-MM-DD");
                                    const isMarked = schedules.some(
                                        (schedule) =>
                                            formattedDate >= schedule.startDate && formattedDate <= schedule.endDate
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
                                            formattedDate >= schedule.startDate && formattedDate <= schedule.endDate
                                    );
                                    const scheduleStartingToday = schedules.find(
                                        (schedule) => formattedDate === schedule.startDate
                                    );
                                    if (isMarked) {
                                        return (
                                            <div className='dot'>
                                                {scheduleStartingToday && (
                                                    <>
                                                        <div className='tooltip'>
                                                            {truncateTitle(scheduleStartingToday.title)}
                                                        </div>
                                                        <div className='start'></div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    }
                                }
                                return null;
                            }}
                            onClickDay={(value: Date) => handleDateClick(value)}
                            value={currentMonth}
                            onChange={(value: any, event: React.MouseEvent<HTMLButtonElement>) => {
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
                    {schedules.length === 0 ? (
                        <p
                            style={{
                                textAlign: "center",
                                color: darkMode ? "#fff" : "#333",
                                marginTop: "20px",
                            }}
                        >
                            일정을 추가해주세요.
                        </p>
                    ) : (
                        schedules.map((schedule) => (
                            <div key={schedule.id} className='schedule-item'>
                                <p
                                    style={{
                                        fontSize: "1.3rem",
                                        color: darkMode ? "white" : "#2e2e2e",
                                        fontWeight: "bold",
                                        marginBottom: "15px",
                                        textAlign: "left",
                                    }}
                                >
                                    {schedule.title}
                                </p>
                                <div
                                    style={{
                                        paddingBottom: "10px",
                                        borderBottom: darkMode ? "1.5px solid #474747" : "1.5px solid #f0f0f0",
                                        textAlign: "left",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "100%",
                                            fontSize: "1.2rem",
                                            color: "#b8b8b8",
                                            fontWeight: "bold",
                                            textAlign: "left",
                                        }}
                                    >
                                        {schedule.startDate} - {schedule.endDate}
                                    </span>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <button
                                            onClick={() => handleEditClick(schedule)}
                                            style={{
                                                background: "none",
                                                marginRight: "10px",
                                                cursor: "pointer",
                                                width: "120px",
                                                height: "40px",
                                                border: "1.5px solid #c4c6cc",
                                                color: darkMode ? "white" : "black",
                                                fontSize: "1rem",
                                                borderRadius: "5px",
                                                fontWeight: "bold",
                                                marginTop: "20px",
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
                                                width: "120px",
                                                height: "40px",
                                                border: "2px solid #d66851",
                                                fontSize: "1rem",
                                                borderRadius: "5px",
                                                color: "#d66851",
                                                fontWeight: "bold",
                                                marginTop: "20px",
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {isModalOpen && (
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
                            contentLabel='Schedule Modal'
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
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}
                            >
                                <h3
                                    style={{
                                        marginBottom: "30px",
                                        color: darkMode ? "white" : "black",
                                    }}
                                >
                                    {edit !== null ? "일정 수정하기" : "일정 추가하기"}
                                </h3>

                                <div
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "13px",
                                    }}
                                >
                                    <span style={{ color: "gray", marginRight: "5px" }}>시작 날짜</span>
                                    <input
                                        type='date'
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        style={{
                                            width: "60%",
                                            height: "10px",
                                            padding: "1rem",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "13px",
                                    }}
                                >
                                    <span style={{ color: "gray", marginRight: "5px" }}>종료 날짜</span>{" "}
                                    <input
                                        type='date'
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        style={{
                                            width: "60%",
                                            height: "10px",
                                            padding: "1rem",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "13px",
                                    }}
                                >
                                    <span style={{ color: "gray", marginRight: "5px" }}>시작 시간</span>{" "}
                                    <input
                                        type='time'
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        style={{
                                            width: "60%",
                                            height: "10px",
                                            padding: "1rem",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "13px",
                                    }}
                                >
                                    <span style={{ color: "gray", marginRight: "5px" }}>종료 시간</span>{" "}
                                    <input
                                        type='time'
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                        style={{
                                            width: "60%",
                                            height: "10px",
                                            padding: "1rem",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    />
                                </div>

                                <input
                                    type='text'
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder='일정을 추가해주세요.'
                                    style={{
                                        width: "83%",
                                        maxWidth: "335px",
                                        height: "10px",
                                        padding: "1rem",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        marginBottom: "25px",
                                    }}
                                />

                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        width: "95%",
                                        maxWidth: "370px",
                                        height: "45px",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor: darkMode ? "#3c57b3" : "#3c57b3",
                                        color: "white",
                                    }}
                                >
                                    {edit !== null ? "수정" : "추가"}
                                </button>
                            </div>
                        </Modal>
                    )}
                </CalendarList>
            </div>
        </Box>
    );
}

export default CalendarView;

interface StyledCalendarProps extends darkProps {
    tileSize: number;
    darkMode: boolean;
}

interface darkProps {
    darkMode: boolean;
}

const Box = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: scroll;
    box-sizing: border-box;

    .scroll {
        width: 80%;
        height: auto;
        max-width: 1300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    }

    @media (max-width: 1200px) {
        .scroll {
            padding-bottom: 50px;
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

    @media (max-width: 550px) {
        justify-content: center;
    }

    @media (max-width: 420px) {
        .scroll {
        }
    }
`;

const CalendarWrap = styled.div<darkProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    height: 800px;
    border-radius: 20px;
    box-sizing: border-box;
    margin: 30px;

    @media (max-width: 1200px) {
        border: none;
        height: 80vh;
        margin-bottom: 20px;
    }

    @media (max-width: 800px) {
        margin-top: 10px;
    }

    @media (max-width: 550px) {
        padding: 0px;
        width: 100%;
        border: none;
        height: auto;
    }
`;

const CustomNavi = styled.div<darkProps>`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 50px;
    font-weight: bold;
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#2e2e2e")};
    padding: 0px 10px 20px 10px;

    span {
        cursor: pointer;
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
        margin-bottom: 20px;

        span {
            font-size: 1rem;
            width: 100%;
        }

        button {
            margin: -10px 20px;
        }
    }
`;

const StyledCalendar = styled.div<StyledCalendarProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    border-radius: 40px;

    .react-calendar {
        width: 100%;
        background: ${({ darkMode }) => (darkMode ? "#2e2e2e" : "#fcfcfc")};
        border: ${({ darkMode }) => (darkMode ? "1px solid #333333" : "1px solid #ededed")};
    }

    .react-calendar__tile.dot::after {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: #91a5d9;
        opacity: 20%;
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
        border-bottom: ${({ darkMode }) => (darkMode ? "0.8px solid #333333" : "0.8px solid #e3e3e3")};
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
    }

    .react-calendar__month-view__days__day {
        border: ${({ darkMode }) => (darkMode ? "0.8px solid #333333" : "0.8px solid #e3e3e3")};
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
        top: 8px;
        right: 5px;
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

    .react-calendar__month-view__days__day--neighboringMonth {
        background: ${({ darkMode }) => (darkMode ? "#3d3d3d" : "#f5f5f5")};
        color: ${({ darkMode }) => (darkMode ? "white" : "#cccccc")};
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
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .year-button:hover {
        background-color: #d5dae3;
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
            top: 5px;
            right: 4px;
            width: 25px;
            height: 25px;
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
`;

const CalendarList = styled.div<darkProps>`
    width: 40%;
    max-width: 350px;
    min-width: 250px;
    height: 800px;
    max-height: 620px;
    min-height: 740px;
    padding: 20px;
    border-radius: 25px;
    overflow-y: scroll;
    border: ${({ darkMode }) => (darkMode ? "1px solid #595959" : "1px solid #e3e3e3")};
    overflow-x: hidden;
    box-sizing: border-box;

    .schedule-item {
        color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    button {
        width: 100%;
        max-width: 300px;
        height: 50px;
        background: #3c57b3;
        color: white;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 20px;
        cursor: pointer;
    }

    button:hover {
        opacity: 40%;
        transition: 0.3s;
    }

    @media (max-width: 1200px) {
        width: 100%;
        max-width: 800px;
        min-height: 650px;
    }

    @media (max-width: 550px) {
        min-width: 220px;
        box-sizing: border-box;
        min-height: 620px;

        button {
            font-size: 1rem;
        }

        button:hover {
            opacity: 100%;
        }
    }
`;
