import { useEffect, useState } from "react";
import {
  addCalendar,
  getCalendars,
  updateCalendar,
  deleteCalendar,
} from "../../api/calendar";
import Modal from "react-modal";
import { StyledCalendar } from "./StCalendar";

interface Schedule {
  id: number;
  date: string;
  time: string;
  title: string;
  user_id: number;
}

function Calendar() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    date: string;
    time: string;
    title: string;
  }>({ date: "", time: "", title: "" });
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

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

    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const selectedSchedule = schedules.find(
      (schedule) => schedule.date === localDate
    );
    setSelectedSchedule(selectedSchedule || null);

    if (selectedSchedule) {
      setFormData(selectedSchedule);
    } else {
      setFormData({ date: localDate, time: "", title: "" });
    }

    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const user_id = 1;
      const newSchedule = await addCalendar({ user_id, ...formData });
      setSchedules([...schedules, newSchedule]);
      setModalOpen(false);
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
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating schedule", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedSchedule) return;

    try {
      await deleteCalendar(selectedSchedule.id);
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.id !== selectedSchedule.id
      );
      setSchedules(updatedSchedules);
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting schedule", error);
    }
  };

  return (
    <>
      <StyledCalendar
        onClickDay={(value: Date) => handleDateClick(value)}
        calendarType={"US"}
        locale={"en-US"}
        formatShortWeekday={(locale: any, date: Date) =>
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()]
        }
        tileClassName={({ date, view }: { date: Date; view: string }) => {
          const dateString = date.toISOString().split("T")[0];
          const hasSchedule = schedules.some(
            (schedule) => schedule.date === dateString
          );
          return hasSchedule ? "has-schedule" : "";
        }}
      />

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
          {selectedSchedule?.id && <button onClick={handleUpdate}>수정</button>}
          {selectedSchedule?.id && <button onClick={handleDelete}>삭제</button>}
          <button onClick={() => setModalOpen(false)}>닫기</button>
        </Modal>
      )}
    </>
  );
}

export default Calendar;
