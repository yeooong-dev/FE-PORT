import instance from "./instance";

interface CalendarAddPayload {
  user_id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  title: string;
}

interface CalendarUpdatePayload {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  title: string;
}

export const addCalendar = async (data: CalendarAddPayload) => {
  try {
    const response = await instance.post(`calendar/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCalendars = async () => {
  try {
    const response = await instance.get(`calendar/getAll`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCalendar = async (
  id: number,
  updates: CalendarUpdatePayload
) => {
  try {
    const response = await instance.put(`calendar/update/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCalendar = async (id: number) => {
  try {
    const response = await instance.delete(`calendar/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
