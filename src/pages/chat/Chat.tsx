import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import {
  BtnBox,
  ChatWrap,
  LeftWrap,
  List,
  ListWrap,
  RightWrap,
  ToggleButton,
} from "./StChat";
import {
  checkIfRoomExists,
  createRoom,
  getInteractedUsers,
  getRoom,
  getUsers,
  removeUserFromRoom,
  sendChatMessage,
} from "../../api/chat";
import { imgGet } from "../../api/mypage";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiSolidFoodMenu } from "react-icons/bi";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import UseUser from "../../hook/UseUser";

interface User {
  id: number;
  name: string;
  profile_image: string | null;
  roomId: number;
  lastMessage?: string;
  user?: {
    id: number;
    name: string;
    profile_image: string | null;
  };
}

interface Message {
  id: number;
  message: string;
  user: {
    id: number;
    name: string;
    profile_image: string | null;
  };
}

interface SocketMessage {
  id: number;
  roomId: number;
  message: string;
  user: {
    id: number;
    name: string;
    profile_image: string | null;
  };
}

interface InteractedUser {
  user?: {
    id: number;
    name: string;
    profile_image: string | null;
  };
  lastMessage: string;
  roomId: number;
  profile_image: string | null;
}

function Chat() {
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

  // 소켓 설정
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BE_SERVER || "");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // 채팅 목록 업데이트 함수
  const updateChatList = useCallback(async () => {
    try {
      const updatedUsers = await getInteractedUsers();
      const updatedUsersWithImages: User[] = updatedUsers.map(
        (user: InteractedUser) => {
          return {
            id: user.user?.id,
            name: user.user?.name,
            profile_image: user.user?.profile_image,
            roomId: user.roomId,
            lastMessage: user.lastMessage,
          };
        }
      );
      setInteractedUsers(updatedUsersWithImages);
    } catch (error) {
      console.error("채팅 목록 업데이트 중 오류 발생:", error);
    }
  }, []);

  const handleMessage = useCallback((data: SocketMessage) => {
    console.log("새 메시지 수신:", data);
    setMessages((prevMessages) => [...prevMessages, data]);

    setInteractedUsers((prevUsers) => {
      const existingUserIndex = prevUsers.findIndex(
        (u) => u.id === data.user.id
      );
      if (existingUserIndex >= 0) {
        return prevUsers.map((user, index) =>
          index === existingUserIndex
            ? { ...user, lastMessage: data.message }
            : user
        );
      } else {
        return [
          ...prevUsers,
          {
            id: data.user.id,
            name: data.user.name,
            profile_image: data.user.profile_image,
            roomId: data.roomId,
            lastMessage: data.message,
          },
        ];
      }
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [socket, handleMessage]);

  const joinRoom = (roomId: number) => {
    if (socket) {
      console.log(`Attempting to join room: ${roomId}`);
      socket.emit("join room", roomId);
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

              return { ...user, profile_image: imageUrl };
            } catch (error) {
              console.error("프로필 이미지 가져오기 실패:", error);
              return {
                ...user,
                profile_image: "/path-to-default-profile-image.png",
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

  // 선택된 유저 업데이트
  const updateInteractedUsers = async () => {
    const updatedUsers = await getInteractedUsers();
    setInteractedUsers(updatedUsers);
  };

  useEffect(() => {
    if (selectedUser) {
      updateInteractedUsers();
    }
  }, [selectedUser]);

  const selectUser = async (user: User) => {
    const foundUser = interactedUsers.find((u) => u.id === user.id);
    if (foundUser) {
      setSelectedUser(foundUser);
    } else {
      setSelectedUser(user);
    }
    joinRoom(user.roomId);

    if (socket && user.roomId) {
      socket.emit("join room", user.roomId);
      const roomMessages = await getRoom(user.roomId);
      setMessages(roomMessages.chats || []);
    }
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

      let roomId;
      if (roomExistence && roomExistence.exists) {
        roomId = roomExistence.room.id;
        console.log(`Room already exists with ID: ${roomId}`);
      } else {
        console.log(
          `Creating new room for IDs: ${currentUserId}, ${targetUserId}`
        );
        const roomName = `Room_${Date.now()}`;
        const newRoom = await createRoom(
          [currentUserId, targetUserId],
          roomName
        );
        roomId = newRoom.id;
        console.log(`New room created with ID: ${roomId}`);
      }

      if (!roomId) {
        console.error("Failed to obtain a valid room ID.");
        return;
      }

      const fetchedRoom = await getRoom(roomId);
      if (!fetchedRoom) {
        console.error("Failed to fetch room details.");
        return;
      }

      const targetUser = allUsers.find((u) => u.id === targetUserId);
      if (!targetUser) {
        console.error("Target user not found.");
        return;
      }

      const updatedUser = {
        ...targetUser,
        roomId,
        lastMessage: fetchedRoom.lastMessage || "",
      };

      setSelectedUser(updatedUser);
      setMessages(fetchedRoom.chats || []);
      joinRoom(roomId);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error in handleNewChat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedUser && inputValue.trim() && socket && user) {
      try {
        const sentMessageResponse = await sendChatMessage(
          selectedUser.roomId,
          inputValue
        );
        if (sentMessageResponse) {
          setInputValue("");
          await updateChatList();
        }
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  // 채팅방 나가기 로직
  const handleLeaveChatRoom = async (roomId: number) => {
    if (selectedUser && user) {
      const confirmLeave = window.confirm("채팅방을 나가겠습니까?");
      if (confirmLeave) {
        try {
          const userId = Number(user.id);
          if (isNaN(userId)) {
            console.error("Invalid user ID.");
            return;
          }

          await removeUserFromRoom(roomId, userId);
          updateChatList();
          setMessages([]);
          setSelectedUser(null);
        } catch (error) {
          console.error("Error leaving chat room:", error);
        }
      }
    }
  };

  // useEffect(() => {
  //   console.log("메세지:", messages);
  // }, [messages]);

  // useEffect(() => {
  //   console.log("모달 이미지:", allUsers);
  // }, [allUsers]);

  // useEffect(() => {
  //   console.log("이미지:", interactedUsers);
  // }, [interactedUsers]);

  return (
    <ChatWrap>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <LeftWrap show={showLeftWrap}>
            <BtnBox>
              <ToggleButton onClick={() => setShowLeftWrap((prev) => !prev)}>
                {showLeftWrap ? (
                  <BiSolidFoodMenu size='30' color='#3c57b3' />
                ) : (
                  <BiSolidFoodMenu size='30' color='#3c57b3' />
                )}
              </ToggleButton>
              <button onClick={() => setModalIsOpen(true)} className='addBtn'>
                <HiOutlinePencilAlt size='33' color='#3c57b3' />
              </button>
            </BtnBox>
            <ListWrap show={showLeftWrap}>
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
                        {user.name}
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
                const isUserSelected =
                  !!selectedUser && selectedUser.id === interactedUser.id;
                return (
                  <List
                    key={`${interactedUser.id}-${index}`}
                    isSelected={isUserSelected}
                    onClick={() => selectUser(interactedUser)}
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
                      <p>{interactedUser.user?.name}</p>
                      <p>{interactedUser.lastMessage}</p>
                    </div>
                    {isUserSelected && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeaveChatRoom(interactedUser.roomId);
                        }}
                        className='exit'
                      >
                        삭제
                      </button>
                    )}
                  </List>
                );
              })}
            </ListWrap>
          </LeftWrap>
          <RightWrap show={showLeftWrap}>
            {selectedUser ? (
              <div className='chatBox'>
                <h3>{selectedUser.name}</h3>
                {messages.map((message, index) => (
                  <div
                    key={`${message.id}-${index}`}
                    style={{
                      width: "90%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        user && message.user.id !== Number(user.id)
                          ? "start"
                          : "end",
                    }}
                  >
                    {user && message.user.id !== Number(user.id) && (
                      <div className='you'>
                        <div className='info'>
                          <span>{message.user.name}</span>
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
                <div className='inputBox'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='메시지를 입력하세요.'
                  />
                  <button onClick={() => handleSendMessage()}>전송</button>
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
