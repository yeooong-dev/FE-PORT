import instance from "./instance";

interface FamilyEventAddPayload {
  user_id: number;
  target: string;
  date: string;
  type: string;
  amount: number;
}

interface FamilyEventUpdatePayload {
  target?: string;
  date: string;
  type?: string;
  amount?: number;
}

export const addFamilyEvent = async (data: FamilyEventAddPayload) => {
  try {
    const response = await instance.post(`familyEvents/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFamilyEvents = async () => {
  try {
    const response = await instance.get(`familyEvents/getAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFamilyEvent = async (
  id: number,
  updates: FamilyEventUpdatePayload
) => {
  try {
    const response = await instance.put(`familyEvents/update/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFamilyEvent = async (id: number) => {
  try {
    const response = await instance.delete(`familyEvents/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllFamilyEvents = async () => {
  try {
    const response = await instance.delete(`familyEvents/deleteAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
