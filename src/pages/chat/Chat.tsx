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
    company_name?: string;
  };
  roomId?: number;
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

  // 소켓 설정
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BE_SERVER || "");
    setSocket(newSocket);

    newSocket.on("updated chat list", (updatedChatList) => {
      setInteractedUsers(updatedChatList);
    });

    newSocket.on("new chat room", (data) => {
      updateChatList();
    });

    return () => {
      newSocket.off("updated chat list");
      newSocket.off("new chat room");
      newSocket.close();
    };
  }, []);

  // 채팅 목록 업데이트 함수
  const updateChatList = useCallback(async () => {
    try {
      const updatedUsers: User[] = await getInteractedUsers();
      setInteractedUsers((prevUsers) => {
        const updatedUsersMap = new Map(
          updatedUsers.map((u: User) => [u.roomId, u])
        );
        return prevUsers.map(
          (user) => updatedUsersMap.get(user.roomId) || user
        );
      });
    } catch (error) {
      console.error("채팅 목록 업데이트 중 오류 발생:", error);
    }
  }, []);

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

        setInputValue("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  // 새 메시지 수신 핸들러
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({
      messageData,
      updatedChatList,
    }: {
      messageData: Message;
      updatedChatList: User[];
    }) => {
      // 새 메시지에 해당하는 사용자 찾기
      const userIndex = interactedUsers.findIndex(
        (u) => u.id === messageData.user.id
      );
      if (userIndex !== -1) {
        // 사용자 목록 업데이트
        const newInteractedUsers = [...interactedUsers];
        newInteractedUsers[userIndex] = {
          ...newInteractedUsers[userIndex],
          lastMessage: messageData.message,
        };
        setInteractedUsers(newInteractedUsers);
      }

      // 현재 채팅방 메시지 업데이트
      if (selectedUser && selectedUser.roomId === messageData.roomId) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    socket.on("new message", handleNewMessage);

    return () => {
      socket.off("new message", handleNewMessage);
    };
  }, [socket, selectedUser, interactedUsers]);

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
      const roomMessages = await getRoom(selectedUser.roomId);
      setMessages(roomMessages.chats || []);
    };

    fetchMessages();
  }, [selectedUser]);

  // 초기 데이터 페칭
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedUsers, interacted] = await Promise.all([
          getUsers(),
          getInteractedUsers(),
        ]);

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

  const selectUser = async (user: User) => {
    if (!deletedRooms.includes(user.roomId)) {
      const roomMessages = await getRoom(user.roomId);
      setMessages(roomMessages.chats || []);
    } else {
      setMessages([]);
    }
    joinRoom(user.roomId);
    setSelectedUser(user);
    await updateChatList();
  };

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
      if (
        roomExistence &&
        roomExistence.exists &&
        !deletedRooms.includes(roomExistence.room.id)
      ) {
        roomId = roomExistence.room.id;

        const fetchedRoom = await getRoom(roomId);
        setMessages(fetchedRoom.chats || []);

        const selectedUserIndex = allUsers.findIndex(
          (u) => u.id === targetUserId
        );
        if (selectedUserIndex !== -1) {
          setSelectedUser(allUsers[selectedUserIndex]);
        }
      } else {
        const roomName = `Room_${Date.now()}`;
        const newRoom = await createRoom(
          [currentUserId, targetUserId],
          roomName
        );
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
  const handleLeaveChatRoom = (roomId: number) => {
    if (selectedUser && user) {
      setShowConfirm(true);
    }
  };

  // 실제로 채팅방을 나가는 로직
  const confirmLeaveRoom = async (roomId: number) => {
    if (!user || !selectedUser) return;
    try {
      const response = await removeUserFromRoom(roomId, Number(user.id));
      if (response && response.success) {
        setDeletedRooms((prev) => [...prev, roomId]);
        setInteractedUsers((prevUsers) =>
          prevUsers.filter((u) => u.roomId !== roomId)
        );
        setSelectedUser(null);
        setMessages([]);
        socket?.emit("leave room", { roomId, userId: user.id });
      } else {
        console.error("Failed to leave chat room");
      }
    } catch (error) {
      console.error("Error leaving chat room:", error);
    }
    setShowConfirm(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (showOnlyChat) {
    return (
      <ChatWrap>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ListWrap show={showLeftWrap} darkMode={darkMode}>
              {interactedUsers.map((interactedUser, index) => {
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
                    <div className='flex'>
                      <p>
                        {interactedUser.user?.name ||
                          interactedUser.user?.company_name}
                      </p>
                    </div>
                    {isUserSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeaveChatRoom(interactedUser.roomId);
                        }}
                        className='exit'
                      >
                        나가기
                      </button>
                    )}
                    {showConfirm && selectedUser && (
                      <CustomConfirm
                        message='채팅방을 나가겠습니까?'
                        onConfirm={() => confirmLeaveRoom(selectedUser.roomId)}
                        onCancel={() => setShowConfirm(false)}
                      />
                    )}
                  </List>
                );
              })}
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
                    maxWidth: "260px",
                    height: "550px",
                    overflowY: "scroll",
                    padding: "30px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#f6f6f6",
                    border: "none",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
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
                        borderBottom: "1.5px solid #e8e8e8",
                        padding: "20px",
                      }}
                    >
                      <img
                        src={
                          user.profile_image || "/path-to-your-default-image"
                        }
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
              {interactedUsers.map((interactedUser, index) => {
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
                    <div className='flex'>
                      <p>
                        {interactedUser.user?.name ||
                          interactedUser.user?.company_name}
                      </p>
                    </div>
                    {isUserSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeaveChatRoom(interactedUser.roomId);
                        }}
                        className='exit'
                      >
                        나가기
                      </button>
                    )}
                    {showConfirm && selectedUser && (
                      <CustomConfirm
                        message='채팅방을 나가겠습니까?'
                        onConfirm={() => confirmLeaveRoom(selectedUser.roomId)}
                        onCancel={() => setShowConfirm(false)}
                      />
                    )}
                  </List>
                );
              })}
            </ListWrap>
          </LeftWrap>
          <RightWrap show={showLeftWrap} darkMode={darkMode}>
            {selectedUser ? (
              <div className='chatBox'>
                <h3>{selectedUser.name}</h3>
                <div className='chatting'>
                  {messages.map((message, index) => (
                    <div
                      key={`${message.id}-${index}`}
                      ref={messagesEndRef}
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent:
                          user && message.user.id !== Number(user.id)
                            ? "start"
                            : "end",
                      }}
                    >
                      {user && message.user.id !== Number(user.id) && (
                        <div className='you'>
                          <div className='info'>
                            <span>
                              {message.user.name || message.user.company_name}
                            </span>
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
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const LeftWrap = styled.div<showProps>`
  width: 40%;
  max-width: 365px;
  height: 83vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
  flex-direction: column;
  border-right: ${({ darkMode }) =>
    darkMode ? "2px solid #2e2e2e" : "2px solid #ebebeb"};

  @media (max-width: 550px) {
    width: ${(props) => (props.show ? "100%" : "100%")};
    max-width: ${(props) => (props.show ? "400px" : "500px")};
    height: ${(props) => (props.show ? "60px" : "83vh")};
    border: none;
  }
`;

export const BtnBox = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;

  h1 {
    font-size: 18px;
    margin-right: 10px;
  }

  .addBtn {
    background: none;
    cursor: pointer;
  }

  @media (max-width: 550px) {
    justify-content: flex-start;

    h1 {
      margin-right: 20px;
    }

    .addBtn {
      margin-right: 10px;
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
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 550px) {
    display: ${(props) => (props.show ? "flex" : "flex")};
    width: ${(props) => (props.show ? "95%" : "95%")};
    max-width: ${(props) => (props.show ? "500px" : "500px")};
    align-items: center;
    margin-top: 40px;
  }
`;

export const List = styled.div<ListProps>`
  width: 100%;
  height: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isSelected
      ? props.darkMode
        ? "#28292b"
        : "#f4f5fb"
      : "transparent"};

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 30px;
  }

  .flex {
    margin-right: 30px;

    p {
      width: 100%;
    }

    p:first-child {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
  }

  .exit {
    width: 50px;
    height: 30px;
    background: #3c57b3;
    color: white;
  }
`;

export const RightWrap = styled.div<showProps>`
  width: 80%;
  max-width: 1400px;
  height: 80vh;
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
    border: ${({ darkMode }) =>
      darkMode ? "1.5px solid #2e2e2e" : "1.5px solid #ebebeb"};

    h3 {
      font-size: 1.1rem;
      font-weight: bold;
      margin: 25px;
      font-family: var(--font-title);
      color: #454545;
    }

    .chatting {
      width: 100%;
      height: auto;
      overflow-y: scroll;
      max-height: 700px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
    }

    .you {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

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
      margin-bottom: 20px;
      color: black;
    }

    .inputBox {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 20px;
      border-top: ${({ darkMode }) =>
        darkMode ? "1.5px solid #2e2e2e" : "1.5px solid #ebebeb"};
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
    height: 75vh;

    .chatBox {
      width: 90%;

      .chatting {
        max-height: 550px;
      }

      .you {
        margin-bottom: 10px;
      }

      .me {
        margin-bottom: 10px;
      }

      .inputBox {
        input {
          width: 70%;
          height: 100%;
          border-radius: 50px;
          margin-right: 0px;
          padding-left: 0.5rem;
          font-size: 15px;
        }
      }
    }
  }
`;
