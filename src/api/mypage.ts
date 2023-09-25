import instance from "./instance";

// 프로필 사진 추가
export const imgAdd = async (userId: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("userId", userId);
    const response = await instance.post("/auth/profile/image", formData);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("프로필 사진을 추가하는데 실패했습니다.");
  }
};

// 프로필 사진 조회
export const imgGet = async (userId: string) => {
  const response = await instance.get(`/auth/profile/image/${userId}`);
  return response;
};

// 프로필 사진 수정
export const imgUpdate = async (userId: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", image);

    const response = await instance.put(
      `/auth/profile/image/${userId}`,
      formData
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("프로필 사진을 수정하는데 실패했습니다.");
  }
};

// 프로필 사진 삭제
export const imgDelete = async (userId: string) => {
  const response = await instance.delete(`/auth/profile/image/${userId}`);
  return response;
};

// 이름 변경
export const updateName = async (
  userId: string,
  newName: string,
  email: string,
  password: string
) => {
  try {
    const response = await instance.put(`/auth/profile/name/${userId}`, {
      newName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const updatePassword = async (
  userId: string,
  email: string,
  newPassword: string,
  currentPassword: string
) => {
  const response = await instance.put(`/auth/profile/password/${userId}`, {
    email,
    newPassword,
    currentPassword,
  });
  return response;
};

// 회원 탈퇴
export const deleteAccount = async (userId: string, password: string) => {
  const response = await instance.delete(`/auth/profile/${userId}`, {
    data: { password },
  });
  return response;
};
