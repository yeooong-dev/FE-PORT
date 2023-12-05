import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ChatWrap, LeftWrap, RightWrap } from "./StChat";
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

interface SocketMessage {
  id: number;
  roomId: number;
  content: string;
  user: {
    id: number;
    name: string;
    profile_image: string | null;
  };
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

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: SocketMessage) => {
      if (selectedUser && data.roomId === selectedUser.roomId) {
        const newMessage = {
          id: data.id,
          content: data.content,
          user: {
            ...data.user,
            roomId: selectedUser.roomId,
          },
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      // 채팅방 목록 업데이트
      const updateChatList = async () => {
        const updatedUsers = await getInteractedUsers();
        setInteractedUsers(updatedUsers);
      };

      updateChatList();
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [socket, selectedUser]);

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
    setSelectedUser(user);
    joinRoom(user.roomId);
    if (socket && user.roomId) {
      socket.emit("join room", user.roomId);
      const roomMessages = await getRoom(user.roomId);
      setMessages(roomMessages.chats || []);
    }
  };

  const handleNewChat = async (userId: number) => {
    const existingRoom = await checkIfRoomExists([userId]);
    let updatedUser: User | null = null;
    const user = allUsers.find((u) => u.id === userId);

    if (existingRoom) {
      updatedUser = user ? { ...user, roomId: existingRoom.id } : null;
    } else {
      const roomName = `Room_${Date.now()}`;
      const room = await createRoom([userId], roomName);
      updatedUser = user ? { ...user, roomId: room.id } : null;
    }

    if (updatedUser) {
      setSelectedUser(updatedUser);
      const roomMessages = await getRoom(updatedUser.roomId);
      setMessages(roomMessages.chats || []);
      if (socket) {
        socket.emit("join room", updatedUser.roomId);
      }
    }
    setModalIsOpen(false);
  };

  // const handleSendMessage = async () => {
  //   if (selectedUser && inputValue.trim() && socket) {
  //     try {
  //       const sentMessageResponse = await postMessage(
  //         selectedUser.roomId,
  //         inputValue
  //       );

  //       // 여기서 sentMessageResponse를 Message 타입으로 사용
  //       const newMessage: Message = {
  //         id: sentMessageResponse.id,
  //         content: sentMessageResponse.content,
  //         user: {
  //           ...sentMessageResponse.user,
  //           roomId: selectedUser.roomId, // 필요하다면 roomId 추가
  //         },
  //       };

  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       setInputValue("");

  //       const updatedUsers = await getInteractedUsers();
  //       setInteractedUsers(updatedUsers);

  //       socket.emit("chat message in room", {
  //         roomId: selectedUser.roomId,
  //         message: inputValue,
  //         userId: selectedUser.id,
  //       });
  //     } catch (error) {
  //       console.error("메시지 전송 중 오류 발생", error);
  //     }
  //   }
  // };

  const handleLeaveChatRoom = async (userId: number) => {
    if (!selectedUser || selectedUser.id !== userId) {
      return;
    }

    const confirmLeave = window.confirm("채팅방을 나가겠습니까?");
    if (confirmLeave) {
      await removeUserFromRoom(selectedUser.roomId, userId);
      setInteractedUsers((prev) => prev.filter((user) => user.id !== userId));
      setMessages([]);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

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
                onClick={() => selectUser(user)}
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
                  // onClick={() => {
                  //   handleSendMessage();
                  // }}
                  >
                    전송
                  </button>
                </div>
                {messages.map((message, index) => (
                  <div
                    key={`${message.id}-${index}`}
                    style={{
                      display: "flex",
                      flexDirection:
                        message.user.id === selectedUser.id
                          ? "row-reverse"
                          : "row",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {/* 상대방 메시지일 경우 */}
                    {message.user.id !== selectedUser.id && (
                      <>
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
                            marginRight: "10px",
                          }}
                        />
                        <div
                          style={{
                            background: "#E0FFFF",
                            padding: "10px",
                            borderRadius: "10px",
                            maxWidth: "70%",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {message.user.name}
                          </span>
                          <p style={{ margin: "5px 0 0 0" }}>
                            {message.content}
                          </p>
                        </div>
                      </>
                    )}
                    {/* 현재 로그인한 사용자의 메시지일 경우 */}
                    {message.user.id === selectedUser.id && (
                      <div
                        style={{
                          background: "#ACE1AF",
                          padding: "10px",
                          borderRadius: "10px",
                          maxWidth: "70%",
                          alignSelf: "flex-end",
                        }}
                      >
                        <p style={{ margin: "5px 0 0 0" }}>{message.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </>
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
