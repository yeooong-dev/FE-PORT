import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ChatWrap, LeftWrap, RightWrap } from "./StChat";
import {
  createRoom,
  getInteractedUsers,
  getRoom,
  getUsers,
  postMessage,
  removeUserFromRoom,
} from "../../api/chat";
import { imgGet } from "../../api/mypage";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

interface User {
  id: number;
  name: string;
  profile_image: string | null;
  roomId: number;
  lastMessage?: string;
}

interface Message {
  id: number;
  content: string;
  user: User;
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

  // 소켓 설정
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BE_SERVER || "");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // 메시지 리스닝
  useEffect(() => {
    if (!socket) return;
    const handleMessage = (message: Message) => {};
    socket.on("chat message", handleMessage);
    return () => {
      if (socket) socket.off("chat message", handleMessage);
    };
  }, [socket]);

  // 유저 불러오기
  useEffect(() => {
    if (selectedUser && typeof selectedUser.roomId === "number") {
      const fetchMessages = async () => {
        const roomMessages = await getRoom(selectedUser.roomId);
        setMessages(roomMessages.chats || []);
      };

      fetchMessages();
    }
  }, [selectedUser]);

  // 초기 데이터 페칭
  useEffect(() => {
    setLoading(true);
    const fetchInitialData = async () => {
      try {
        const [fetchedUsers, interacted] = await Promise.all([
          getUsers(),
          getInteractedUsers(),
        ]);

        // 이미지 가져오는 로직을 포함한 사용자 데이터 업데이트
        const usersWithImages = await Promise.all(
          fetchedUsers.map(async (user: User) => {
            try {
              const response = await imgGet(String(user.id));
              let imageUrl = response.data.imageUrl;
              if (imageUrl) {
                imageUrl =
                  "https://yeong-port.s3.ap-northeast-2.amazonaws.com/" +
                  imageUrl
                    .split(
                      "https://yeong-port.s3.ap-northeast-2.amazonaws.com/"
                    )
                    .join("");
              }
              return { ...user, profile_image: imageUrl };
            } catch (error) {
              console.error(error);
              return user;
            }
          })
        );
        setAllUsers(usersWithImages || []);
        setInteractedUsers(interacted || []);
        if (
          interacted &&
          interacted[0] &&
          typeof interacted[0].roomId === "number"
        ) {
          setSelectedUser(interacted[0]);
          const roomMessages = await getRoom(interacted[0].roomId);
          setMessages(roomMessages.chats || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 채팅 유저 선택
  const selectUser = async (user: User) => {
    setSelectedUser(user);
    if (user && typeof user.roomId === "number") {
      const roomMessages = await getRoom(user.roomId);
      setMessages(roomMessages.chats || []);
    }
  };

  const handleNewChat = async (userId: number) => {
    try {
      const roomName = `Room_${Date.now()}`;
      const room = await createRoom([userId], roomName);
      if (room && typeof room.id === "number") {
        const newUser = allUsers.find((u) => u.id === userId);
        if (newUser) {
          const updatedUser = { ...newUser, roomId: room.id };
          // 이미 있는 사용자는 제외하고 새 배열을 생성
          setInteractedUsers((prev) => {
            const filteredPrev = prev.filter((u) => u.id !== newUser.id);
            return [updatedUser, ...filteredPrev];
          });
          setSelectedUser(updatedUser);
          console.log("Updated User:", updatedUser);
          const roomMessages = await getRoom(room.id);
          setMessages(roomMessages.chats || []);
        }
      }
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error in handleNewChat", error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedUser && inputValue.trim()) {
      try {
        const roomId = selectedUser.roomId;
        const userId = Number(selectedUser.id);
        const newMessageResponse = await postMessage(
          roomId,
          userId,
          inputValue
        );

        const newMessage = {
          id: newMessageResponse.id,
          content: newMessageResponse.message,
          user: selectedUser,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        if (socket) {
          socket.emit("chat message", { roomId, msg: newMessage });
        }

        setInputValue("");
      } catch (error) {
        console.error("Error in handleSendMessage", error);
      }
    }
  };

  const handleLeaveChatRoom = async (userId: number) => {
    try {
      if (selectedUser?.roomId) {
        await removeUserFromRoom(selectedUser.roomId, userId);
        setInteractedUsers((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error leaving chat room", error);
    }
  };

  return (
    <ChatWrap>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <LeftWrap>
            <button onClick={() => setModalIsOpen(true)} className='addBtn'>
              <HiOutlinePencilAlt size='33' color='#51439d' />
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel='User List Modal'
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  width: "40%",
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
                    fontSize: "1.5rem",
                    marginBottom: "60px",
                  }}
                >
                  PORT 사용자들
                </h5>
                {allUsers.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      width: "100%",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      borderBottom: "1.5px solid #e8e8e8",
                      padding: "15px",
                    }}
                  >
                    <img
                      src={user.profile_image || "/path-to-your-default-image"}
                      alt={`${user.name}'s profile`}
                      style={{
                        width: "80px",
                        marginRight: "30px",
                      }}
                    />
                    {user.name}
                    <button
                      onClick={() => handleNewChat(user.id)}
                      style={{
                        marginLeft: "100px",
                        width: "150px",
                        height: "50px",
                        borderRadius: "10px",
                        background: "#51439d",
                        color: "white",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                      }}
                    >
                      채팅하기
                    </button>
                  </div>
                ))}
              </div>
            </Modal>
            {interactedUsers.map((user, index) => (
              <div
                key={`${user.id}-${index}`}
                onClick={() => setSelectedUser(user)}
                className='list'
              >
                <img
                  src={user.profile_image || "/path-to-your-default-image"}
                  alt={`${user.name}'s profile`}
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                />
                <div className='flex'>
                  <p>{user.name}</p>
                  <p>{user.lastMessage}</p>
                </div>
                <button onClick={() => handleLeaveChatRoom(user.id)}>
                  채팅 나가기
                </button>
              </div>
            ))}
          </LeftWrap>
          <RightWrap>
            {selectedUser ? (
              <>
                <h3>{selectedUser.name}</h3>

                <div>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='메시지를 입력하세요.'
                  />
                  <button
                    onClick={() => {
                      handleSendMessage();
                    }}
                  >
                    전송
                  </button>
                </div>
                {messages.map((message, index) =>
                  message.user ? (
                    <div
                      key={`${message.id}-${index}`}
                      style={{
                        display: "flex",
                        flexDirection:
                          message.user.id === selectedUser?.id
                            ? "row-reverse"
                            : "row",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={
                          message.user.profile_image ||
                          "/path-to-your-default-image"
                        }
                        alt={`${message.user.name}'s profile`}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginRight:
                            message.user.id === selectedUser?.id ? "0" : "10px",
                          marginLeft:
                            message.user.id === selectedUser?.id ? "10px" : "0",
                        }}
                      />
                      <div
                        style={{
                          background:
                            message.user.id === selectedUser?.id
                              ? "#ACE1AF"
                              : "#E0FFFF",
                          padding: "10px",
                          borderRadius: "10px",
                          maxWidth: "70%",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {message.user.id !== selectedUser?.id
                            ? message.user.name
                            : ""}
                        </span>

                        <p style={{ margin: "5px 0 0 0" }}>{message.content}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </>
            ) : (
              "채팅할 사용자를 선택해주세요!"
            )}
          </RightWrap>
        </>
      )}
    </ChatWrap>
  );
}
export default Chat;
