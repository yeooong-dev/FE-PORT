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
  }
};
export const createRoom = async (userIds: number[], name: string) => {
  try {
    const response = await instance.post("/chat/room", { userIds, name });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getRoom = async (roomId: number) => {
  try {
    const response = await instance.get(`/chat/room/${roomId}`);
    if (!response.data) throw new Error("Invalid response data");
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
    });
    return response.data;
  } catch (error) {
    console.error(error);
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
