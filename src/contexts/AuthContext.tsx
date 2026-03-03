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

// Persist mock users in localStorage so they survive page reloads
function getStoredUsers(): { email: string; password: string; name: string }[] {
  try {
    const stored = localStorage.getItem('elektorfun_users');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: { email: string; password: string; name: string }[]) {
  localStorage.setItem('elektorfun_users', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('elektorfun_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const users = getStoredUsers();
    const foundUser = users.find(
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
    
    const users = getStoredUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return false;
    }
    
    users.push({ email, password, name });
    saveUsers(users);
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
