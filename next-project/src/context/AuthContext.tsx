import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthContextProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = global?.localStorage?.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const onLogout = () => {
    navigate.push('/Login');
    global?.localStorage?.removeItem('token');
  };

  const authContextValue: AuthContextProps = {
    isLoggedIn,
    onLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;