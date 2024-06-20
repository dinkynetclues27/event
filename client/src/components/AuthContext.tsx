import React, { createContext, useContext, useState } from 'react';

type User_type = 'user' | 'admin';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: User_type;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<User_type>('user'); 

  const login = () => {
  
    setIsLoggedIn(true);
    setUserRole('user'); 
  };

  const logout = () => {
 
    setIsLoggedIn(false);
    setUserRole('user');
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    userRole,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
