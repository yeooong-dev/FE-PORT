import instance from "./instance";

export const getInteractedUsers = async () => {
  try {
    const response = await instance.get("/chat/interactedUsers");
    console.log("API Response for getInteractedUsers:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get("/chat/users");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createRoom = async (userIds: number[], name: string) => {
  try {
    const response = await instance.post("/chat/room", { userIds, name });
    console.log("Server Response for Room Creation:", response.data);

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

export const getRoom = async (roomId: number) => {
  try {
    const response = await instance.get(`/chat/room/${roomId}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (response.headers["content-type"]?.includes("application/json")) {
      const data = response.data;
      if (data && data.chats) {
        return data;
      } else {
        throw new Error("Invalid response data");
      }
    } else {
      const errorMessage = response.data;
      throw new Error(errorMessage);
    }
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

export const postMessage = async (
  roomId: number,
  userId: number,
  message: string
) => {
  try {
    const response = await instance.post(`/chat/room/${roomId}/message`, {
      userId,
      message,
      roomId,
    });
    if (!response.data) throw new Error("Invalid response data");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeUserFromRoom = async (roomId: number, userId: number) => {
  try {
    const response = await instance.delete(
      `/chat/room/${roomId}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
