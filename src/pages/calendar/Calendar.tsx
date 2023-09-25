import { useEffect, useState } from "react";
import { ContentTitle } from "../mypage/StMypage";
import Calendar from "react-calendar";
import {
  addCalendar,
  getCalendars,
  updateCalendar,
  deleteCalendar,
} from "../../api/calendar";
import Modal from "react-modal";

interface Schedule {
  id: number;
  date: string;
  time: string;
  title: string;
  user_id: number;
}

function CalendarComponent() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ date: "", time: "", title: "" });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getCalendars();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules", error);
      }
    };
    fetchSchedules();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: date.toISOString().split("T")[0] });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await addCalendar({ user_id: 1, ...formData });
      setModalOpen(false);
      setFormData({ date: "", time: "", title: "" });
      const updatedSchedules = await getCalendars();
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error("Error submitting schedule", error);
    }
  };

  return (
    <>
      <ContentTitle>나의 캘린더</ContentTitle>
      <Calendar onClickDay={(value: Date) => handleDateClick(value)} />
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel='Schedule Modal'
        >
          <input type='date' value={formData.date} readOnly />
          <input
            type='time'
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <input
            type='text'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <button onClick={handleSubmit}>추가</button>
          <button onClick={() => setModalOpen(false)}>닫기</button>
        </Modal>
      )}
    </>
  );
}

export default CalendarComponent;
