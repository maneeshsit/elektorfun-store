import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in a real app, this would be a backend)
const mockUsers: { email: string; password: string; name: string }[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('elektorfun_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userData = {
        id: crypto.randomUUID(),
        email: foundUser.email,
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem('elektorfun_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const exists = mockUsers.some((u) => u.email === email);
    if (exists) {
      return false;
    }
    
    mockUsers.push({ email, password, name });
    const userData = {
      id: crypto.randomUUID(),
      email,
      name,
    };
    setUser(userData);
    localStorage.setItem('elektorfun_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elektorfun_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
