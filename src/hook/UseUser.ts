import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import instance from "../api/instance";

interface User {
  name: string;
  id: string;
  profileImage: string | null;
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
      setUser({
        id: response.data.id,
        name: response.data.name,
        profileImage: response.data.profileImage,
      });
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [token, email]);

  return { user, setUser };
};

export default UseUser;
