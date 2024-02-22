import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import {
    checkIfRoomExists,
    createRoom,
    getInteractedUsers,
    getRoom,
    getUsers,
    removeUserFromRoom,
} from "../../api/chat";
import { imgGet } from "../../api/mypage";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { LuSendHorizonal } from "react-icons/lu";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import UseUser from "../../hook/UseUser";
import styled from "styled-components";
import { useDarkMode } from "../../components/darkmode/DarkModeContext";
import CustomConfirm from "../../components/alert/CustomConfirm";

interface User {
    id: number;
    name: string;
    profile_image: string | null;
    roomId: number;
    lastMessage?: string;
    company_name?: string;

    user?: {
        id: number;
        name: string;
        profile_image: string | null;
        company_name: string | null;
    };
}

interface Message {
    id: number;
    message: string;
    user: {
        id: number;
        name: string;
        profile_image: string | null;
        company_name?: string | null;
    };
    roomId?: number;
}

interface ChatUser {
    id: number;
    name: string;
    profile_image: string | null;
    company_name?: string | null;
}

interface MessageData {
    id: number;
    roomId: number;
    message: string;
    user: ChatUser;
}

interface NewMessageEventData {
    messageData: MessageData;
    updatedChatList: User[];
}

function Chat({ showOnlyChat = false }) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [interactedUsers, setInteractedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = UseUser();
    const [showLeftWrap, setShowLeftWrap] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [deletedRooms, setDeletedRooms] = useState<number[]>([]);
    const { darkMode } = useDarkMode();
    const [showConfirm, setShowConfirm] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 소켓 설정
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_BE_LOCAL || "");
        setSocket(newSocket);

        newSocket.on("updated chat list", (updatedChatList) => {
            setInteractedUsers(updatedChatList);
        });

        newSocket.on("new chat room", (data) => {
            console.log(`[클라이언트] 새 메시지 수신 (방 ID: ${data.messageData.roomId})`);
            updateChatList();
        });

        return () => {
            newSocket.off("updated chat list");
            console.log(`[클라이언트] 채팅 목록 업데이트 수신`);
            newSocket.off("new chat room");
            newSocket.close();
        };
    }, []);

    // 채팅 목록 업데이트 함수
    const updateChatList = useCallback(async () => {
        try {
            let updatedUsers: User[] = await getInteractedUsers();
            updatedUsers = updatedUsers.filter((user) => !deletedRooms.includes(user.roomId));
            setInteractedUsers(updatedUsers);
        } catch (error) {
            console.error("채팅 목록 업데이트 중 오류 발생:", error);
        }
    }, [deletedRooms]);

    const handleSendMessage = async () => {
        if (selectedUser && inputValue.trim() && socket && user) {
            try {
                let roomId = selectedUser.roomId;
                const userId = Number(user.id);
                const selectedUserId = Number(selectedUser.id);

                if (!roomId) {
                    const roomName = `ChatRoom_${Date.now()}`;
                    const userIds = [userId, selectedUserId];
                    const newRoom = await createRoom(userIds, roomName);
                    roomId = newRoom.id;
                    setSelectedUser({ ...selectedUser, roomId: roomId });
                }

                console.log("Sending chat message to server:", {
                    roomId,
                    inputValue,
                    userId,
                });

                socket.emit("chat message in room", {
                    roomId,
                    message: inputValue,
                    userId,
                });

                const newMessage = {
                    id: Date.now(),
                    message: inputValue,
                    user: {
                        id: userId,
                        name: user.name,
                        profile_image: user.profileImage,
                    },
                    roomId,
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);

                setInputValue("");
            } catch (error) {
                console.error("Failed to send message", error);
            }
        }
    };

    useEffect(() => {
        if (!socket || !user) return;

        const handleNewMessage = (data: NewMessageEventData) => {
            const { messageData } = data;

            // 여기서 selectedUser와 messageData의 존재 여부를 확인합니다.
            if (selectedUser && messageData && selectedUser.roomId === messageData.roomId) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: messageData.id,
                        message: messageData.message,
                        user: messageData.user,
                        roomId: messageData.roomId,
                    },
                ]);
            }
        };

        socket.on("new message", handleNewMessage);

        return () => {
            socket.off("new message", handleNewMessage);
        };
    }, [socket, selectedUser, setMessages]);

    // 상호작용한 사용자 목록 업데이트 함수
    const updateInteractedUsers = useCallback(async () => {
        const updatedUsers = await getInteractedUsers();
        setInteractedUsers(updatedUsers);
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleUpdatedChatList = (updatedChatList: User[]) => {
            setInteractedUsers(updatedChatList);
        };

        socket.on("updated chat list", handleUpdatedChatList);

        return () => {
            socket.off("updated chat list", handleUpdatedChatList);
        };
    }, [socket]);

    const joinRoom = (roomId: number) => {
        if (socket && user) {
            socket.emit("join room", roomId.toString(), user.id);
        }
    };

    // 유저 불러오기
    useEffect(() => {
        if (!selectedUser || typeof selectedUser.roomId !== "number") {
            return;
        }

        const fetchMessages = async () => {
            console.log(`[Client] fetchMessages - Fetching messages for Room ID: ${selectedUser?.roomId}`);

            const roomMessages = await getRoom(selectedUser.roomId);
            setMessages(roomMessages.chats || []);
            console.log(`[fetchMessages] Fetching messages for Room ID: ${selectedUser.roomId}`);
        };

        fetchMessages();
    }, [selectedUser]);

    // 초기 데이터 페칭
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [fetchedUsers, interacted] = await Promise.all([getUsers(), getInteractedUsers()]);

                const usersWithImages = await Promise.all(
                    fetchedUsers.map(async (user: User) => {
                        try {
                            const response = await imgGet(String(user.id));
                            let imageUrl = response.data.imageUrl;

                            if (!imageUrl) {
                                imageUrl = "/path-to-default-profile-image.png";
                            }

                            return {
                                ...user,
                                profile_image: imageUrl,
                                company_name: user.company_name,
                            };
                        } catch (error) {
                            console.error("프로필 이미지 가져오기 실패:", error);
                            return {
                                ...user,
                                profile_image: "/path-to-default-profile-image.png",
                                company_name: user.company_name,
                            };
                        }
                    })
                );
                setAllUsers(usersWithImages || []);
                setInteractedUsers(interacted || []);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            updateInteractedUsers();
        }
    }, [selectedUser]);

    const handleNewChat = async (targetUserId: number) => {
        if (!user || !user.id) {
            console.error("User ID is not available.");
            return;
        }

        const currentUserId = parseInt(user.id);
        if (isNaN(currentUserId)) {
            console.error("Invalid user ID.");
            return;
        }

        const userIds = [currentUserId, targetUserId];
        try {
            const roomExistence = await checkIfRoomExists(userIds);

            let roomId: number;
            if (roomExistence && roomExistence.exists) {
                roomId = roomExistence.room.id;

                if (deletedRooms.includes(roomId)) {
                    setMessages([]);
                } else {
                    const fetchedRoom = await getRoom(roomId);
                    setMessages(fetchedRoom.chats || []);
                }

                const selectedUserIndex = allUsers.findIndex((u) => u.id === targetUserId);
                if (selectedUserIndex !== -1) {
                    setSelectedUser(allUsers[selectedUserIndex]);
                }
            } else {
                const roomName = `Room_${Date.now()}`;
                const newRoom = await createRoom([currentUserId, targetUserId], roomName);
                roomId = newRoom.id;

                const targetUser = allUsers.find((u) => u.id === targetUserId);
                if (!targetUser) {
                    console.error("Target user not found.");
                    return;
                }

                setSelectedUser({ ...targetUser, roomId: newRoom.id, lastMessage: "" });
                setMessages([]);
            }
            joinRoom(roomId);
            await updateChatList();
            setDeletedRooms((prev) => prev.filter((id) => id !== roomId));
            setModalIsOpen(false);
        } catch (error) {
            console.error("Error in handleNewChat:", error);
        }
    };

    // 채팅방 나가기 로직
    const handleLeaveChatRoom = async (roomId: number) => {
        if (!user || !selectedUser) return;

        try {
            const response = await removeUserFromRoom(roomId, Number(user.id));
            if (response && response.success) {
                setDeletedRooms((prev) => [...prev, roomId]);

                if (selectedUser.roomId === roomId) {
                    setMessages([]);
                    setSelectedUser(null);
                }

                setInteractedUsers((prevUsers) => prevUsers.filter((u) => u.roomId !== roomId));

                socket?.emit("leave room", { roomId, userId: user.id });
            } else {
                console.error("Failed to leave chat room");
            }
        } catch (error) {
            console.error("Error leaving chat room:", error);
        }
        setShowConfirm(false);
    };

    const selectUser = async (user: User) => {
        console.log(`[Client] selectUser - Selected User ID: ${user.id}, Room ID: ${user.roomId}`);

        if (deletedRooms.includes(user.roomId)) {
            console.log(`Room ${user.roomId} has been left. Clearing messages.`);
            setMessages([]);
            setSelectedUser(user);
            return;
        }

        joinRoom(user.roomId);
        // 나가지 않은 채팅방의 경우에만 메시지 목록 불러오기
        const roomMessages = await getRoom(user.roomId);
        if (roomMessages && roomMessages.chats) {
            setMessages(roomMessages.chats);
        }
        setSelectedUser(user);
        await updateChatList();

        const isMobile = window.innerWidth <= 550;
        if (isMobile) {
            setShowLeftWrap(true);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (showOnlyChat) {
        return (
            <ChatWrap>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <ListWrap show={showLeftWrap} darkMode={darkMode}>
                            {interactedUsers.length > 0 ? (
                                interactedUsers.map((interactedUser, index) => {
                                    if (!interactedUser.user) {
                                        return null;
                                    }

                                    const isUserSelected =
                                        selectedUser && selectedUser.user
                                            ? selectedUser.user.id === interactedUser.user.id
                                            : false;

                                    return (
                                        <List
                                            key={interactedUser.user.id}
                                            isSelected={isUserSelected}
                                            onClick={() => selectUser(interactedUser)}
                                            darkMode={darkMode}
                                        >
                                            <img
                                                src={
                                                    interactedUser.user?.profile_image
                                                        ? `https://yeong-port.s3.ap-northeast-2.amazonaws.com/${interactedUser.user.profile_image}`
                                                        : "https://yeong-port.s3.ap-northeast-2.amazonaws.com/person.png"
                                                }
                                                alt={`${interactedUser.user?.name || "User"}'s profile`}
                                                style={{
                                                    borderRadius: "50%",
                                                }}
                                            />

                                            <p>{interactedUser.user?.name || interactedUser.user?.company_name}</p>

                                            {isUserSelected && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleLeaveChatRoom(interactedUser.roomId);
                                                    }}
                                                    className='exit'
                                                >
                                                    X
                                                </button>
                                            )}
                                            {showConfirm && selectedUser && (
                                                <CustomConfirm
                                                    message='채팅방을 나가겠습니까?'
                                                    onConfirm={() => handleLeaveChatRoom(selectedUser.roomId)}
                                                    onCancel={() => setShowConfirm(false)}
                                                />
                                            )}
                                        </List>
                                    );
                                })
                            ) : (
                                <div>채팅한 사용자가 없습니다.</div>
                            )}
                        </ListWrap>
                    </>
                )}
            </ChatWrap>
        );
    }

    return (
        <ChatWrap>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <LeftWrap show={showLeftWrap} darkMode={darkMode}>
                        <BtnBox>
                            <h1>메세지</h1>
                            <button onClick={() => setModalIsOpen(true)} className='addBtn'>
                                <HiOutlinePencilAlt size='33' color='#3c57b3' />
                            </button>
                            <ToggleButton onClick={() => setShowLeftWrap((prev) => !prev)}>
                                {showLeftWrap ? (
                                    <BiSolidFoodMenu size='30' color='#3c57b3' />
                                ) : (
                                    <BiSolidFoodMenu size='30' color='#3c57b3' />
                                )}
                            </ToggleButton>
                        </BtnBox>
                        <ListWrap show={showLeftWrap} darkMode={darkMode}>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                contentLabel='User List Modal'
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
                                        color: darkMode ? "white" : "black",
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
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <h5
                                        style={{
                                            fontSize: "1.2rem",
                                            margin: "20px 0px",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        PORT 사용자들
                                    </h5>
                                    {allUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            style={{
                                                width: "100%",
                                                height: "50px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                borderBottom: darkMode ? "1.5px solid #424242" : "1.5px solid #e8e8e8",
                                                padding: "20px",
                                            }}
                                        >
                                            <img
                                                src={user.profile_image || "/path-to-your-default-image"}
                                                alt={`${user.name}'s profile`}
                                                style={{
                                                    width: "60px",
                                                }}
                                            />
                                            <span style={{ margin: "30px", width: "280px" }}>
                                                {user.company_name || user.name}
                                            </span>
                                            <button
                                                onClick={() => handleNewChat(user.id)}
                                                style={{
                                                    width: "80px",
                                                    minWidth: "80px",
                                                    height: "40px",
                                                    borderRadius: "5px",
                                                    background: "#3c57b3",
                                                    color: "white",
                                                    fontSize: "15px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                채팅하기
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Modal>
                            {interactedUsers.length > 0
                                ? interactedUsers.map((interactedUser, index) => {
                                      if (!interactedUser.user) {
                                          return null;
                                      }

                                      const isUserSelected =
                                          selectedUser && selectedUser.user
                                              ? selectedUser.user.id === interactedUser.user.id
                                              : false;

                                      return (
                                          <List
                                              key={interactedUser.user.id}
                                              isSelected={isUserSelected}
                                              onClick={() => selectUser(interactedUser)}
                                              darkMode={darkMode}
                                          >
                                              <img
                                                  src={
                                                      interactedUser.user?.profile_image
                                                          ? `https://yeong-port.s3.ap-northeast-2.amazonaws.com/${interactedUser.user.profile_image}`
                                                          : "https://yeong-port.s3.ap-northeast-2.amazonaws.com/person.png"
                                                  }
                                                  alt={`${interactedUser.user?.name || "User"}'s profile`}
                                                  style={{
                                                      borderRadius: "50%",
                                                  }}
                                              />

                                              <p>{interactedUser.user?.name || interactedUser.user?.company_name}</p>

                                              {isUserSelected && (
                                                  <button
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleLeaveChatRoom(interactedUser.roomId);
                                                      }}
                                                      className='exit'
                                                  >
                                                      X
                                                  </button>
                                              )}
                                              {showConfirm && selectedUser && (
                                                  <CustomConfirm
                                                      message='채팅방을 나가겠습니까?'
                                                      onConfirm={() => handleLeaveChatRoom(selectedUser.roomId)}
                                                      onCancel={() => setShowConfirm(false)}
                                                  />
                                              )}
                                          </List>
                                      );
                                  })
                                : windowWidth <= 550 && (
                                      <div style={{ textAlign: "center", padding: "20px" }}>
                                          채팅한 사용자가 없습니다.
                                      </div>
                                  )}
                        </ListWrap>
                    </LeftWrap>
                    <RightWrap show={showLeftWrap} darkMode={darkMode}>
                        {selectedUser ? (
                            <div className='chatBox'>
                                <h3>
                                    {selectedUser.user
                                        ? selectedUser.user.name || selectedUser.user.company_name
                                        : selectedUser.name || selectedUser.company_name}
                                </h3>
                                <div className='chatting'>
                                    {messages.map((message, index) => (
                                        <div
                                            key={`${message.id}-${index}`}
                                            ref={messagesEndRef}
                                            style={{
                                                width: "90%",
                                                display: "flex",
                                                justifyContent:
                                                    user && message.user.id !== Number(user.id) ? "start" : "end",
                                            }}
                                        >
                                            {user && message.user.id !== Number(user.id) && (
                                                <div className='you'>
                                                    <div className='info'>
                                                        <span>{message.user.name || message.user.company_name}</span>
                                                        <img
                                                            src={
                                                                message.user?.profile_image
                                                                    ? `https://yeong-port.s3.ap-northeast-2.amazonaws.com/${message.user.profile_image}`
                                                                    : "https://yeong-port.s3.ap-northeast-2.amazonaws.com/person.png"
                                                            }
                                                            alt={`${message.user.name}'s profile`}
                                                        />
                                                    </div>

                                                    <div className='you_msg'>
                                                        <p>{message.message}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {user && message.user.id === Number(user.id) && (
                                                <div className='me'>
                                                    <p>{message.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='inputBox'>
                                    <input
                                        type='text'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder='메시지를 입력하세요.'
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") handleSendMessage();
                                        }}
                                    />
                                    <button onClick={() => handleSendMessage()}>
                                        <LuSendHorizonal size='20' />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h3>"채팅할 사용자를 선택해주세요!"</h3>
                        )}
                    </RightWrap>
                </>
            )}
        </ChatWrap>
    );
}
export default Chat;

interface ListProps {
    isSelected: boolean;
    darkMode: boolean;
}

interface showProps {
    show: boolean;
    darkMode: boolean;
}

export const ChatWrap = styled.div`
    width: 100%;
    height: 88vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;

    @media (max-width: 550px) {
        flex-direction: column;
    }
`;

export const LeftWrap = styled.div<showProps>`
    width: 40%;
    max-width: 365px;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: ${({ darkMode }) => (darkMode ? "1.5px solid #2e2e2e" : "1.5px solid #ebebeb")};

    @media (max-width: 550px) {
        width: ${(props) => (props.show ? "100%" : "100%")};
        max-width: ${(props) => (props.show ? "400px" : "500px")};
        height: ${(props) => (props.show ? "50px" : "75vh")};
        border: none;
    }
`;

export const BtnBox = styled.div`
    width: 92%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;

    h1 {
        font-size: 18px;
        margin: 10px;
    }

    .addBtn {
        background: none;
        cursor: pointer;
    }

    @media (max-width: 550px) {
        justify-content: flex-start;

        h1 {
            margin: 15px;
        }

        .addBtn {
            margin-right: 15px;
        }
    }
`;

export const ToggleButton = styled.button`
    display: none;
    background: none;
    cursor: pointer;
    margin-right: 10px;

    @media (max-width: 550px) {
        display: block;
    }
`;

export const ListWrap = styled.div<showProps>`
    width: 100%;
    max-width: 350px;
    height: 85vh;
    max-height: 820px;
    overflow-y: scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    @media (max-width: 550px) {
        display: ${(props) => (props.show ? "flex" : "flex")};
        width: ${(props) => (props.show ? "95%" : "90%")};
        max-width: ${(props) => (props.show ? "500px" : "500px")};
        align-items: center;
        margin-top: 20px;
    }
`;

export const List = styled.div<ListProps>`
    position: relative;
    width: 90%;
    height: 80px;
    margin: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    border: ${(props) =>
        props.isSelected ? "2px solid #3c57b3" : props.darkMode ? "2px solid #28292b" : "2px solid #fafafa"};

    color: ${({ darkMode }) => (darkMode ? "white" : "black")};

    box-shadow: ${(props) =>
        props.isSelected
            ? props.darkMode
                ? "5px 5px 5px 0px rgba(0, 0, 0, 0.1)"
                : "5px 6px 5px 0px rgba(0, 0, 0, 0.1)"
            : "transparent"};

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 20px;
    }

    p {
        font-weight: bold;
        font-size: 16px;
    }

    .exit {
        position: absolute;
        right: 30px;
        width: 30px;
        height: 30px;
        background: #f25b50;
        border-radius: 50px;
        color: white;
    }

    @media (max-width: 800px) {
        img {
            width: 45px;
            height: 45px;
            margin: 10px;
        }
    }

    @media (max-width: 700px) {
        .exit {
            right: 10px;
        }
    }

    @media (max-width: 550px) {
        img {
            width: 50px;
            height: 50px;
            margin: 20px;
        }

        .exit {
            right: 20px;
        }
    }
`;

export const RightWrap = styled.div<showProps>`
    width: 80%;
    max-width: 1400px;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 20px;
    border-radius: 50px;

    .chatBox {
        width: 95%;
        height: 100vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        position: relative;
        border-radius: 50px;
        background: ${({ darkMode }) => (darkMode ? "#28292b" : "#fcfcfc")};
        border: ${({ darkMode }) => (darkMode ? "1.5px solid #2e2e2e" : "1.5px solid #ebebeb")};

        h3 {
            font-size: 1.1rem;
            font-weight: bold;
            margin: 25px;
            font-family: var(--font-title);
            color: ${({ darkMode }) => (darkMode ? "white" : "#454545")};
        }

        .chatting {
            width: 100%;
            height: auto;
            overflow-y: scroll;
            max-height: 600px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
        }

        .you {
            display: flex;
            align-items: center;
            margin: 8px;

            .you_msg {
                background: #f4f5fb;
                max-width: 70%;
                padding: 13px 15px;
                border-radius: 10px;
                align-self: flex-end;
                color: black;
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                font-size: 14px;
            }

            img {
                width: 35px;
                height: 35px;
                border-radius: 50px;
            }
        }

        .me {
            background: #e0ffff;
            max-width: 70%;
            padding: 13px 15px;
            border-radius: 10px;
            align-self: flex-end;
            margin: 8px;
            color: black;
        }

        .inputBox {
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 20px;
            border-top: ${({ darkMode }) => (darkMode ? "1.5px solid #2e2e2e" : "1.5px solid #ebebeb")};
            padding-top: 15px;

            input {
                width: 82%;
                height: 100%;
                border-radius: 50px;
                margin-right: 10px;
                padding-left: 1rem;
                background: ${({ darkMode }) => (darkMode ? "#28292b" : "#fcfcfc")};
                font-size: 15px;
            }

            input:focus {
                outline: none;
            }

            button {
                width: 50px;
                height: 50px;
                border-radius: 50px;
                color: white;
                font-weight: bold;
                background: #3c57b3;
                cursor: pointer;
                box-shadow: 2px 2px 5px 2px rgba(60, 87, 179, 0.22);
                -webkit-box-shadow: 2px 2px 5px 2px rgba(60, 87, 179, 0.22);
                -moz-box-shadow: 2px 2px 5px 2px rgba(60, 87, 179, 0.22);
            }
        }
    }

    @media (max-width: 550px) {
        display: ${(props) => (props.show ? "flex" : "none")};
        width: ${(props) => (props.show ? "100%" : "0")};
        margin-right: 0px;
        height: 70vh;

        .chatBox {
            width: 90%;
            height: 68vh;

            .you {
                margin: 5px;
            }

            .me {
                margin: 5px;
            }

            h3 {
                font-size: 1rem;
                margin: 15px;
            }

            .chatting {
                height: 68%;
            }

            .inputBox {
                height: 40px;

                input {
                    width: 70%;
                    height: 100%;
                    border-radius: 50px;
                    margin-right: 0px;
                    padding-left: 0.5rem;
                    font-size: 15px;
                }

                button {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
`;
