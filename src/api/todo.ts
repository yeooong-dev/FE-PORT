import instance from "./instance";

interface TodoAddPayload {
  text: string;
  completed: boolean;
}

interface TodoUpdatePayload {
  text: string;
  completed: boolean;
}

export const todoAdd = async (data: TodoAddPayload) => {
  try {
    const response = await instance.post("/todo/add", data);
    return response.data;
  } catch (error: any) {
    console.error(error.response ? error.response : error);
    throw new Error("새로운 항목을 추가하는 데 실패하셨습니다.");
  }
};

export const todoGet = async () => {
  try {
    const response = await instance.get("/todo/get");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("모든 할일 항목을 가져오는데 실패하였습니다.");
  }
};

export const todoUpdate = async (todo_id: number, data: TodoUpdatePayload) => {
  try {
    const response = await instance.put(`/todo/update/${todo_id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("수정하는데 실패하였습니다.");
  }
};

export const todoDelete = async (todo_id: number) => {
  try {
    const response = await instance.delete(`/todo/delete/${todo_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("삭제하는데 실패하였습니다.");
  }
};

export const todoToggleCheck = async (todo_id: number) => {
  try {
    const response = await instance.put(`/todo/toggle/${todo_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
