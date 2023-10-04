import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ChatWrap, LeftWrap, RightWrap } from "./StChat";
import { createRoom, getRoom, getUsers, postMessage } from "../../api/chat";
import { imgGet } from "../../api/mypage";
import { HiOutlinePencilAlt } from "react-icons/hi";

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
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        const usersWithImages = await Promise.all(
          fetchedUsers.map(async (user: any) => {
            try {
              const response = await imgGet(user.id);
              let imageUrl = response.data.imageUrl;
              if (imageUrl) {
                imageUrl = imageUrl.replace(
                  "https://yeong-port.s3.ap-northeast-2.amazonaws.com/",
                  ""
                );
                imageUrl =
                  "https://yeong-port.s3.ap-northeast-2.amazonaws.com/" +
                  imageUrl;
              }
              return { ...user, profile_image: imageUrl };
            } catch (error) {
              console.error(error);
              return user;
            }
          })
        );
        setUsers(usersWithImages || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedUser) {
        try {
          const roomMessages = await getRoom(selectedUser.roomId);
          setMessages(roomMessages.chats || []);
        } catch (error) {
          console.error("Error loading messages", error);
        }
      }
    };

    loadMessages();
  }, [selectedUser]);

  const handleNewChat = async (userId: number) => {
    try {
      const roomName = `Room_${Date.now()}`;
      const room = await createRoom([userId], roomName);
      if (room) {
        const user = users.find((user) => user.id === userId);
        if (user) {
          const updatedUser = { ...user, roomId: room.id };
          setSelectedUser(updatedUser);

          const roomMessages = await getRoom(room.id);
          if (roomMessages && Array.isArray(roomMessages.chats)) {
            setMessages(roomMessages.chats);
          } else {
            console.error("Invalid response:", roomMessages);
          }
        }
        setModalIsOpen(false);
      }
    } catch (error) {
      console.error("Error in handleNewChat", error);
    }
  };

  const handleSendMessage = async () => {
    console.log("handleSendMessage is called!");
    if (selectedUser && inputValue.trim()) {
      try {
        const roomId = selectedUser.roomId;
        const userId = Number(selectedUser.id);

        if (
          typeof roomId !== "number" ||
          Number.isNaN(roomId) ||
          !Number.isInteger(roomId) ||
          roomId <= 0
        ) {
          console.error("Invalid roomId:", roomId);
          return;
        }
        if (Number.isNaN(userId) || !Number.isInteger(userId) || userId <= 0) {
          console.error("Invalid userId:", userId);
          return;
        }

        const newMessageResponse = await postMessage(
          roomId,
          userId,
          inputValue
        );
        console.log(newMessageResponse);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: newMessageResponse.id,
            content: newMessageResponse.message,
            user: selectedUser,
          },
        ]);

        setInputValue("");
      } catch (error) {
        console.error("Error in handleSendMessage", error);
      }
    }
  };

  return (
    <ChatWrap>
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
            {users.map((user) => (
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
        {users.map((user) => (
          <div
            key={user.id}
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
                  console.log("Send button is clicked!");
                  handleSendMessage();
                }}
              >
                전송
              </button>
            </div>
            {messages.map((message) =>
              message.user ? (
                <div
                  key={message.id}
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
    </ChatWrap>
  );
}

export default Chat;
