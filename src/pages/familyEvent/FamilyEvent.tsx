import { useState, useEffect, ChangeEvent } from "react";
import Modal from "react-modal";
import {
  addFamilyEvent,
  deleteAllFamilyEvents,
  deleteFamilyEvent,
  getAllFamilyEvents,
  updateFamilyEvent,
} from "../../api/familyEvents";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import {
  Amount,
  BtnBox,
  Date,
  FamilyEventWrap,
  InputBox,
  Target,
  Type,
} from "./StFamilyEvent";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";

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
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 7;
  const { darkMode } = useDarkMode();

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

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
    setDate(event.date.split("T")[0]);
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
      <FamilyEventWrap darkMode={darkMode}>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "68%",
              height: "800px",
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
              overflowY: "auto",
              padding: "2.5rem",
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
          <p
            style={{
              fontSize: "1.8rem",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: darkMode ? "white" : "#2e2e2e",
            }}
          >
            경조사 기록 내역
          </p>
          <div
            style={{
              width: "90%",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                alignItems: "center",
                background: "#e6e6e6",
                borderRadius: "10px",
                color: "#5e5e5e",
              }}
            >
              <span
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                경조사 대상
              </span>

              <span
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                경조사 날짜
              </span>
              <span
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                경조사 유형
              </span>

              <span
                style={{
                  width: "20%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                경조사 금액
              </span>
            </div>
          </div>

          {currentEvents.map((event) => (
            <div
              key={event.id}
              style={{
                width: "90%",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: darkMode ? "white" : "#2e2e2e",
              }}
            >
              <div
                key={event.id}
                style={{
                  width: "100%",
                  height: "70px",
                  borderBottom: "1.5px solid #d9d9d9",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-20px",
                }}
              >
                <span
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {event.target}
                </span>
                <span
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {event.date.split("T")[0]}{" "}
                </span>

                <span
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {event.type}
                </span>

                <span
                  style={{
                    width: "20%",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {event.amount}원
                </span>

                <div
                  style={{
                    width: "20%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => {
                      setTarget(event.target);
                      setDate(event.date);
                      setType(event.type);
                      setAmount(event.amount);
                      openEditModal(event);
                    }}
                    style={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      background: "none",
                      marginRight: "10px",
                      color: darkMode ? "white" : "#51439d",
                    }}
                  >
                    <BsPencil size='25' />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("기록을 삭제하시겠습니까?"))
                        handleDeleteEvent(event.id);
                    }}
                    style={{
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      background: "none",
                      color: darkMode ? "white" : "#51439d",
                    }}
                  >
                    <IoTrashOutline size='25' />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "1.2rem",
                  margin: "0.5rem",
                  background: "none",
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundColor:
                    currentPage === number ? "#51439d" : "transparent",
                  color: currentPage === number ? "white" : "black",
                }}
              >
                {number}
              </button>
            ))}
          </div>

          {events.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("모든 기록을 삭제하시겠습니까?"))
                  handleDeleteAllEvents();
              }}
              style={{
                marginTop: "20px",
                background: "none",
                fontSize: "1.2rem",
                border: "1.5px solid #e34f39",
                borderRadius: "10px",
                padding: "13px",
                color: "#e34f39",
                cursor: "pointer",
              }}
            >
              모든 이벤트 삭제
            </button>
          )}
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "80%",
              height: "800px",
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
          <InputBox>
            <Target
              type='text'
              value={target}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTarget(e.target.value)
              }
              placeholder='경조사 대상'
              style={{
                paddingLeft: "2rem",
                fontSize: "1.2rem",
              }}
            />
            <Date
              type='date'
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDate(e.target.value)
              }
              placeholder='경조사 날짜'
              style={{
                paddingLeft: "2rem",
                fontSize: "1.2rem",
              }}
            />
            <Type
              type='text'
              value={type}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value)
              }
              placeholder='경조사 유형'
              style={{
                paddingLeft: "2rem",
                fontSize: "1.2rem",
              }}
            />
            <Amount
              type='number'
              value={amount || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Number(e.target.value))
              }
              placeholder='경조사 금액'
              style={{
                paddingLeft: "2rem",
                fontSize: "1.2rem",
                marginBottom: "50px",
              }}
            />
            <button
              onClick={() => {
                if (window.confirm("수정하시겠습니까?")) handleUpdateEvent();
              }}
              style={{
                width: "500px",
                height: "65px",
                fontSize: "1.2rem",
                background: "#51439d",
                color: "white",
                cursor: "pointer",
              }}
            >
              수정하기
            </button>
          </InputBox>
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
