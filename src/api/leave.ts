import moment from "moment-timezone";
import instance from "./instance";

// 특정 날짜의 연차 신청 상태 조회
export const getLeavesForDate = async (date: Date) => {
  try {
    const dateString = moment(date).tz("Asia/Seoul").format("YYYY-MM-DD");
    const response = await instance.get(`leave/get`, {
      params: { date: dateString },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 새로운 연차 신청 처리
export const applyForLeave = async (date: Date, userId: number) => {
  try {
    const dateString = moment(date).tz("Asia/Seoul").format("YYYY-MM-DD");
    const response = await instance.post(`leave/apply`, {
      date: dateString,
      userId,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error("신청 중 오류가 발생했습니다.");
    }
  }
};

// 연차 신청 삭제
export const deleteLeave = async (leaveId: number) => {
  try {
    const response = await instance.delete(`leave/delete/${leaveId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
