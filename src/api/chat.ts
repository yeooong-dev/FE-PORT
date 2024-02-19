import instance from "./instance";

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
    throw error;
  }
};

export const createRoom = async (userIds: number[], name: string) => {
  try {
    const response = await instance.post("/chat/room", { userIds, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkIfRoomExists = async (userIds: number[]) => {
  try {
    const response = await instance.get(`/chat/room/exist`, {
      params: { userIds: userIds.join(",") },
    });
    return response.data.exists ? response.data.room : null;
  } catch (error) {
    throw error;
  }
};

export const getRoom = async (roomId: number) => {
  try {
    const response = await instance.get(`/chat/room/${roomId}`);
    return response.data;
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
