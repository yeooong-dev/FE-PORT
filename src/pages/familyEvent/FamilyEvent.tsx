import { useState, useEffect, ChangeEvent } from "react";
import Modal from "react-modal";
import {
  addFamilyEvent,
  deleteAllFamilyEvents,
  deleteFamilyEvent,
  getAllFamilyEvents,
  updateFamilyEvent,
} from "../../api/familyEvents";
import { ContentTitle } from "../mypage/StMypage";
import {
  Amount,
  BtnBox,
  Date,
  FamilyEventWrap,
  InputBox,
  Target,
  Type,
} from "./StFamilyEvent";

interface Event {
  id: number;
  user_id: number;
  target: string;
  date: string;
  type: string;
  amount: number;
}

function FamilyEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(1);
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getAllFamilyEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const newEvent = await addFamilyEvent({
        user_id: userId,
        target,
        date,
        type,
        amount: amount || 0,
      });
      setEvents([...events, newEvent]);
      clearInputs();
    } catch (error) {
      console.error(error);
      alert("모든 항목을 입력바랍니다.")
    }
  };

  const handleUpdateEvent = async () => {
    if (editEventId == null) return;

    try {
      if (
        target &&
        date &&
        type &&
        typeof amount === "number" &&
        amount !== 0
      ) {
        const updatedEvent = await updateFamilyEvent(editEventId, {
          target,
          date,
          type,
          amount,
        });
        setEvents(events.map((e) => (e.id === editEventId ? updatedEvent : e)));
        closeEditModal();
        clearInputs();
      } else {
        console.error("All fields are required");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteFamilyEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAllEvents = async () => {
    try {
      await deleteAllFamilyEvents();
      setEvents([]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputs = () => {
    setTarget("");
    setDate("");
    setType("");
    setAmount(0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (event: Event) => {
    setTarget(event.target);
    setDate(event.date);
    setType(event.type);
    setAmount(event.amount);
    setEditEventId(event.id);
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <ContentTitle>경조사 기록</ContentTitle>
      <FamilyEventWrap>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <button onClick={closeModal}>X</button>
          {events.map((event) => (
            <div key={event.id}>
              <span>
                경조사 대상: {event.target} - 경조사 날짜: {event.date} - 경조사
                유형: {event.type} - 경조사 금액: {event.amount}원
              </span>
              <button
                onClick={() => {
                  console.log("수정 버튼 클릭됨!");
                  setTarget(event.target);
                  setDate(event.date);
                  setType(event.type);
                  setAmount(event.amount);
                  openEditModal(event);
                }}
              >
                수정
              </button>
              <button onClick={() => handleDeleteEvent(event.id)}>삭제</button>
            </div>
          ))}
          <button onClick={handleDeleteAllEvents}>모든 이벤트 삭제</button>
        </Modal>
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
          <button onClick={closeEditModal}>X</button>
          <InputBox>
            <Target
              type='text'
              value={target}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTarget(e.target.value)
              }
              placeholder='경조사 대상'
            />
            <Date
              type='date'
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
              placeholder='경조사 날짜'
            />
            <Type
              type='text'
              value={type}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
              placeholder='경조사 유형'
            />
            <Amount
              type='number'
              value={amount || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Number(e.target.value))
              }
              placeholder='경조사 금액'
            />
          </InputBox>
          <button onClick={handleUpdateEvent}>수정하기</button>
        </Modal>
        <InputBox>
          <Target
            type='text'
            value={target}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTarget(e.target.value)
            }
            placeholder='경조사 대상'
          />
          <Date
            type='date'
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            placeholder='경조사 날짜'
          />
          <Type
            type='text'
            value={type}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setType(e.target.value)
            }
            placeholder='경조사 유형'
          />
          <Amount
            type='number'
            value={amount || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
            }
            placeholder='경조사 금액'
          />
        </InputBox>
        <BtnBox>
          <button className='add' onClick={handleAddEvent}>
            기록하기
          </button>
          <button className='get' onClick={openModal}>
            이력보기
          </button>
        </BtnBox>
      </FamilyEventWrap>
    </>
  );
}

export default FamilyEvent;
