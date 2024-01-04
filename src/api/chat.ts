import instance from "./instance";

interface Message {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    profile_image: string | null;
  };
}

export const getInteractedUsers = async () => {
  try {
    const response = await instance.get("/chat/interactedUsers");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get("/chat/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createRoom = async (userIds: number[], name: string) => {
  try {
    const response = await instance.post("/chat/room", { userIds, name });

    if (response.data && typeof response.data === "object") {
      return response.data;
    } else {
      throw new Error("Unexpected server response");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkIfRoomExists = async (userIds: number[]) => {
  const userIdsParam = userIds.join(",");

  try {
    const response = await instance.get(`/chat/room/exist`, {
      params: { userIds: userIdsParam },
    });
    return response.data.exists ? response.data.room : null;
  } catch (error) {
    console.error("checkIfRoomExists API 호출 중 오류:", error);
    throw error;
  }
};

export const getRoom = async (roomId: number) => {
  try {
    const response = await instance.get(`/chat/room/${roomId}`);

    if (response.status === 404) {
      throw new Error("Room not found");
    }

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if (!data) {
      throw new Error("Invalid response data");
    }

    if (!("chats" in data)) {
      console.warn("Received room data without chats", data);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const joinRoom = async (roomId: number, userId: number) => {
  try {
    const response = await instance.post(`/chat/room/${roomId}/join`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendChatMessage = async (
  roomId: number,
  message: string
): Promise<Message | null> => {
  try {
    const response = await instance.post(`/chat/room/${roomId}/message`, {
      message,
    });
    if (response.data) {
      return {
        id: response.data.id,
        content: response.data.content,
        user: response.data.user,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in postMessage:", error);
    return null;
  }
};

export const removeUserFromRoom = async (roomId: number, userId: number) => {
  try {
    const response = await instance.put(`/chat/room/${roomId}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
