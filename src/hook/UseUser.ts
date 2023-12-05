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
      await instance.put("/path/to/your/api/endpoint", {
        profileImage: imageUrl,
        email,
      });
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
