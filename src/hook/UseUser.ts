import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import instance from "../api/instance";

interface User {
  name: string;
  id: string;
  profileImage?: string | null;
}

const UseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();
  const token = cookies.get("authorization");
  const email = cookies.get("userEmail");

  const fetchUserInfo = async () => {
    if (!token || !email) return;
    try {
      const response = await instance.get<User>(`/auth/user?email=${email}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const updateProfileImage = async (imageUrl: string | null) => {
    if (!user || !token) return;
    try {
      // 여기서 프로필 이미지를 업데이트하는 API 호출을 수행합니다.
      await instance.put("/path/to/your/api/endpoint", {
        profileImage: imageUrl,
        email,
      });
      // API 호출이 성공하면 fetchUserInfo 함수를 호출하여 사용자 정보를 최신화합니다.
      await fetchUserInfo();
    } catch (error) {
      console.error("Failed to update profile image", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token, email]);

  return { user, setUser, updateProfileImage };
};

export default UseUser;
