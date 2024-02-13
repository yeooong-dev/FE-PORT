import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import instance from "../api/instance";

interface User {
  id: string;
  name: string;
  email?: string;
  profileImage: string | null;
  company_name?: string;
  company_code?: string | null;
  isEmployeeRegistered?: boolean;
  isCompany?: boolean;
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
        email: response.data.email,
        profileImage: response.data.profileImage,
        company_name: response.data.company_name,
        company_code: response.data.company_code,
        isEmployeeRegistered: response.data.isEmployeeRegistered,
        isCompany: response.data.isCompany,
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
