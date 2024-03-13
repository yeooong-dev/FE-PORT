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
import { Amount, BtnBox, Date, FamilyEventWrap, InputBox, Target, Title, Type } from "./StFamilyEvent";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomAlert from "../../components/alert/CustomAlert";
import CustomConfirm from "../../components/alert/CustomConfirm";

interface Event {
    id: number;
    target: string;
    date: string;
    type: string;
    amount: number;
}

function FamilyEvent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [target, setTarget] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState<number | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editEventId, setEditEventId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const { darkMode } = useDarkMode();
    const [alertType, setAlertType] = useState<"error" | "success" | undefined>();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [showSingleDeleteConfirm, setShowSingleDeleteConfirm] = useState(false);
    const [showAllDeleteConfirm, setShowAllDeleteConfirm] = useState(false);

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
        if (!target || !date || !type || typeof amount !== "number" || amount === 0) {
            setAlertMessage("모든 창을 입력해주세요.");
            setAlertType("error");
            return;
        }

        try {
            const newEvent = await addFamilyEvent({
                target,
                date,
                type,
                amount: amount || 0,
            });
            setEvents([...events, newEvent]);
            clearInputs();
            setAlertType("success");
            setAlertMessage("추가 완료되었습니다. 이력보기에서 확인하세요.");
        } catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("모든 항목을 입력해주세요.");
        }
    };

    const handleUpdateEvent = async () => {
        if (editEventId == null) return;

        if (!target || !date || !type || typeof amount !== "number" || amount === 0) {
            setAlertMessage("모든 창을 입력해주세요.");
            setAlertType("error");
            return;
        }

        try {
            const updatedEvent = await updateFamilyEvent(editEventId, {
                target,
                date,
                type,
                amount,
            });
            setEvents(events.map((e) => (e.id === editEventId ? updatedEvent : e)));
            closeEditModal();
            clearInputs();
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

    const openDeleteAllConfirmation = () => {
        setShowConfirm(true);
    };

    const handleConfirmDeleteAllEvents = async () => {
        await handleDeleteAllEvents();
        setShowConfirm(false);
    };

    const handleDeleteConfirmation = () => {
        if (selectedEventId !== null) {
            handleDeleteEvent(selectedEventId);
            setSelectedEventId(null);
            setShowConfirm(false);
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

    const handleUpdateEventConfirm = async () => {
        if (!target || !date || !type || typeof amount !== "number" || amount === 0) {
            setAlertMessage("모든 창을 입력해주세요.");
            setAlertType("error");
            return;
        }

        try {
            await handleUpdateEvent();
            setAlertMessage("수정 완료되었습니다.");
            setAlertType("success");
        } catch (error) {
            setAlertMessage("에러 발생. 다시 시도해주세요.");
            setAlertType("error");
        }
    };

    return (
        <>
            {alertMessage && (
                <CustomAlert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => {
                        setAlertMessage(null);
                        setAlertType(undefined);
                    }}
                />
            )}
            <FamilyEventWrap darkMode={darkMode}>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: "999",
                        },
                        content: {
                            width: "80%",
                            maxWidth: "500px",
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
                            justifyContent: "flex-start",
                            position: "relative",
                            overflowY: "scroll",
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
                    <h3
                        style={{
                            paddingTop: "40px",
                            paddingBottom: "20px",
                            color: darkMode ? "white" : "black",
                        }}
                    >
                        경조사 기록 내역
                    </h3>
                    <div
                        style={{
                            width: "100%",
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                background: "#e6e6e6",
                                borderRadius: "10px",
                                color: "#5e5e5e",
                                fontSize: "14px",
                                paddingLeft: "10px",
                            }}
                        >
                            <span
                                style={{
                                    width: "15%",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                }}
                            >
                                대상
                            </span>

                            <span
                                style={{
                                    width: "15%",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                }}
                            >
                                날짜
                            </span>
                            <span
                                style={{
                                    width: "15%",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                }}
                            >
                                유형
                            </span>

                            <span
                                style={{
                                    width: "20%",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                }}
                            >
                                금액
                            </span>
                        </div>
                    </div>

                    {currentEvents.map((event) => (
                        <div
                            key={event.id}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: darkMode ? "white" : "#2e2e2e",
                            }}
                        >
                            <div
                                key={event.id}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderBottom: darkMode ? "1.5px solid #595959" : "1.5px solid #d9d9d9",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    padding: "10px 0 10px 10px",
                                }}
                            >
                                <span
                                    style={{
                                        width: "15%",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        marginRight: "10px",
                                    }}
                                >
                                    {event.target}
                                </span>
                                <span
                                    style={{
                                        width: "15%",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        marginRight: "10px",
                                    }}
                                >
                                    {event.date.split("T")[0]}{" "}
                                </span>

                                <span
                                    style={{
                                        width: "15%",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        marginRight: "10px",
                                    }}
                                >
                                    {event.type}
                                </span>

                                <span
                                    style={{
                                        width: "20%",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        marginRight: "20px",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {event.amount}원
                                </span>

                                <div
                                    style={{
                                        width: "10%",
                                        textAlign: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5px",
                                        gap: "5px",
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
                                            marginRight: "5px",
                                            color: darkMode ? "white" : "#3c57b3",
                                        }}
                                    >
                                        <BsPencil size='20' />
                                    </button>
                                    {showSingleDeleteConfirm && (
                                        <CustomConfirm
                                            message='기록을 삭제하시겠습니까?'
                                            onConfirm={handleDeleteConfirmation}
                                            onCancel={() => setShowSingleDeleteConfirm(false)}
                                        />
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedEventId(event.id);
                                            setShowSingleDeleteConfirm(true);
                                            setShowAllDeleteConfirm(false);
                                        }}
                                        style={{
                                            fontSize: "1.2rem",
                                            cursor: "pointer",
                                            background: "none",
                                            color: darkMode ? "white" : "#3c57b3",
                                        }}
                                    >
                                        <IoTrashOutline size='20' />
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
                                    margin: "10px 5px 0 5px",
                                    background: "none",
                                    cursor: "pointer",
                                    borderRadius: "20%",
                                    backgroundColor: currentPage === number ? "#3c57b3" : "transparent",
                                    color: currentPage === number ? "white" : "#969696",
                                }}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    {showAllDeleteConfirm && (
                        <CustomConfirm
                            message='모든 기록을 삭제하시겠습니까?'
                            onConfirm={handleConfirmDeleteAllEvents}
                            onCancel={() => setShowAllDeleteConfirm(false)}
                        />
                    )}

                    {events.length > 0 && (
                        <button
                            onClick={() => {
                                openDeleteAllConfirmation();
                                setShowAllDeleteConfirm(true);
                                setShowSingleDeleteConfirm(false);
                            }}
                            style={{
                                marginTop: "20px",
                                background: "none",
                                fontSize: "1rem",
                                border: "1.5px solid #e34f39",
                                borderRadius: "10px",
                                padding: "10px",
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
                            zIndex: "999",
                        },
                        content: {
                            width: "80%",
                            maxWidth: "500px",
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
                            overflowY: "scroll",
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
                        onClick={closeEditModal}
                    >
                        X
                    </button>
                    <InputBox>
                        <Target
                            type='text'
                            value={target}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTarget(e.target.value)}
                            placeholder='경조사 대상'
                            style={{
                                fontSize: "1rem",
                            }}
                        />
                        <Date
                            type='date'
                            value={date}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                            placeholder='경조사 날짜'
                            style={{
                                fontSize: "1rem",
                            }}
                        />
                        <Type
                            type='text'
                            value={type}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                            placeholder='경조사 유형'
                            style={{
                                fontSize: "1rem",
                            }}
                        />
                        <Amount
                            type='number'
                            value={amount || ""}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                            placeholder='경조사 금액'
                            style={{
                                fontSize: "1rem",
                                marginBottom: "30px",
                            }}
                        />
                        <button
                            onClick={handleUpdateEventConfirm}
                            style={{
                                width: "100%",
                                fontSize: "16px",
                                background: "#3c57b3",
                                color: "white",
                                cursor: "pointer",
                                borderRadius: "10px",
                                padding: "15px",
                            }}
                        >
                            수정하기
                        </button>
                    </InputBox>
                </Modal>
                <InputBox>
                    <Title darkMode={darkMode}>경조사 기록하기</Title>
                    <Target
                        type='text'
                        value={target}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const input = e.target.value;
                            if (input.length > 5) {
                                setAlertMessage("5글자까지 작성가능합니다.");
                                setAlertType("error");
                            } else {
                                setTarget(input);
                                if (alertMessage) {
                                    setAlertMessage(null);
                                    setAlertType(undefined);
                                }
                            }
                        }}
                        placeholder='경조사 대상'
                    />

                    <Date
                        type='date'
                        value={date}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                        placeholder='경조사 날짜'
                    />
                    <Type
                        type='text'
                        value={type}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                        placeholder='경조사 유형    ex) 결혼식'
                    />
                    <Amount
                        type='number'
                        value={amount || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                        placeholder='경조사 금액    *숫자만 입력 가능'
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
