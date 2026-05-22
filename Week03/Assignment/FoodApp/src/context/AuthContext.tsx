import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;

  login: () => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};