import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

interface UserState {
  name: string;
  profileImage: string;
}

interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<any>;
  updateUserContext: (user: UserState) => void;
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
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  const updateUserContext = useCallback(
    (user: UserState) => {
      dispatch({ type: "SET_USER", payload: user });
      localStorage.setItem("user", JSON.stringify(user));
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({ state, dispatch, updateUserContext }),
    [state, updateUserContext]
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "SET_USER", payload: user });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
