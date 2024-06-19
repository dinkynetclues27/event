// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'user' | 'admin';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: UserRole;
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
  const [userRole, setUserRole] = useState<UserRole>('user'); // Default role

  const login = () => {
    // Implement login logic here, set isLoggedIn and userRole based on API response
    setIsLoggedIn(true);
    setUserRole('user'); // or 'admin'
  };

  const logout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
    setUserRole('user'); // Reset role on logout
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    userRole,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
