import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface User {
  name: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies();
  const token = cookies.get("authorization");
  const email = cookies.get("userEmail");
  
  console.log("Token:", token);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!token || !email) return;

      try {
        const response = await axios.get<User>(`/auth/user?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response);
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
