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
      alert("추가 완료되었습니다. 이력보기에서 확인하세요.");
    } catch (error) {
      console.error(error);
      alert("모든 항목을 입력바랍니다.");
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "56%",
              height: "800px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#f6f6f6",
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
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "20px",
              fontSize: "1.6rem",
              background: "none",
              cursor: "pointer",
            }}
          >
            X
          </button>
          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            경조사 기록 내역
          </p>
          <div
            style={{
              width: "80%",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "lightgray",
              padding: "10px",
            }}
          >
            <div
              style={{
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                background: "gray",
                padding: "10px",
              }}
            >
              <span>경조사 대상</span>
              <span>경조사 날짜</span>
              <span>경조사 유형</span>
              <span>경조사 금액</span>
            </div>
          </div>

          {events.map((event) => (
            <div
              key={event.id}
              style={{
                width: "80%",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                background: "gray",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{event.target}</span>
              <span style={{ fontSize: "1.2rem" }}>{event.date}</span>
              <span style={{ fontSize: "1.2rem" }}>{event.type}</span>
              <span style={{ fontSize: "1.2rem" }}>{event.amount}원</span>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    console.log("수정 버튼 클릭됨!");
                    setTarget(event.target);
                    setDate(event.date);
                    setType(event.type);
                    setAmount(event.amount);
                    openEditModal(event);
                  }}
                  style={{
                    fontSize: "1.2rem",
                    borderBottom: "1px solid gray",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  style={{
                    fontSize: "1.2rem",
                    borderBottom: "1px solid gray",
                  }}
                >
                  삭제
                </button>{" "}
              </div>
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
            placeholder='경조사 유형    ex) 결혼식'
          />
          <Amount
            type='number'
            value={amount || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
            }
            placeholder='경조사 금액    ex) 50,000'
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
