import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import instance from "../api/instance";

interface User {
  name: string;
  id: string; 
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();
  const token = cookies.get("authorization");
  const email = cookies.get("userEmail");

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token || !email) return;

      try {
        const response = await instance.get<User>(`/auth/user?email=${email}`);

        // console.log("API response:", response);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    getUserInfo();
  }, [token, email]);

  return user;
};

export default useUser;
