import { createContext, useContext, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
  children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev: any) => {
      const nextMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(nextMode));
      return nextMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      "useDarkMode는 DarkModeProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
