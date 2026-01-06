import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulação de login - será substituído por autenticação real no futuro
      const mockUser: User = {
        id: '1',
        name: role === 'clinic' ? 'Clínica Exemplo' :
              role === 'psychologist' ? 'Dr. João Silva' :
              'Maria Santos',
        email,
        role,
        avatar: undefined,
      };

      // Simula um delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
