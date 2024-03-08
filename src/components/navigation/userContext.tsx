import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

interface UserState {
    name: string;
    company_name: string;
    profileImage: string | null;
    mode: "IoMdPerson" | "FaPeopleGroup";
}

interface UserContextProps {
    state: UserState;
    dispatch: React.Dispatch<any>;
    updateUserContext: (user: UserState) => void;
}

const initialState: UserState = {
    name: "",
    company_name: "",
    profileImage: null,
    mode: "IoMdPerson",
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
        case "SET_MODE":
            return {
                ...state,
                mode: action.payload,
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

    const updateUserContext = useCallback(
        (user: UserState) => {
            dispatch({ type: "SET_USER", payload: user });
            localStorage.setItem("user", JSON.stringify(user));
        },
        [dispatch]
    );

    const value = useMemo(() => ({ state, dispatch, updateUserContext }), [state, updateUserContext]);

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("UseUserContext는 UserProvider 내에서 사용해야 합니다.");
    }
    return context;
};
