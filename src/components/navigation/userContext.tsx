import React, { createContext, useContext, useEffect, useReducer } from "react";

interface UserState {
  name: string;
  profileImage: string;
}

interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<any>;
}

const initialState: UserState = {
  name: "",
  profileImage: "",
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "SET_USER", payload: user });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
