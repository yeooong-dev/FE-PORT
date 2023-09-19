import instance from "./instance";

// 프로필 사진 추가
export const imgAdd = async (userId: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
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
  const formData = new FormData();
  formData.append("image", image);

  const response = await instance.put(
    `/auth/profile/image/${userId}`,
    formData
  );
  return response;
};

// 프로필 사진 삭제
export const imgDelete = async (userId: string) => {
  const response = await instance.delete(`/auth/profile/image/${userId}`);
  return response;
};

// 이름 변경
export const updateName = async (
  userId: string,
  name: string,
  email: string
) => {
  const response = await instance.put("/auth/profile/name", {
    userId,
    name,
    email,
  });
  return response;
};

// 비밀번호 변경
export const updatePassword = async (
  password: string,
  newPassword: string,
  email: string
) => {
  const response = await instance.put("/auth/profile/password", {
    password,
    newPassword,
    email,
  });
  return response;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const response = await instance.delete("/auth/profile");
  return response;
};
