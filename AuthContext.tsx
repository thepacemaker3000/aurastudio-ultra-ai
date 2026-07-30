import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin' | 'team_lead';
  tier: 'free' | 'pro' | 'executive' | 'enterprise';
  creditsRemaining: number;
  languagePreference: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  deductCredit: (amount?: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'usr_executive_8842',
    email: 'executive@aurastudio.ai',
    fullName: 'AuraStudio Executive',
    role: 'admin',
    tier: 'executive',
    creditsRemaining: 250,
    languagePreference: 'ar',
  });
  const [token, setToken] = useState<string | null>('demo-token-pro');

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (data.success && data.data?.user) {
        setUser(data.data.user);
        setToken(data.data.token || 'demo-token-pro');
        return true;
      }
    } catch (e) {
      console.error('Auth login error', e);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const deductCredit = (amount = 1): boolean => {
    if (!user) return false;
    if (user.creditsRemaining < amount) return false;
    setUser({ ...user, creditsRemaining: user.creditsRemaining - amount });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
        deductCredit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
