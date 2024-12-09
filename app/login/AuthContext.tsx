import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  cveCliente: number | null;
  login: (token: string, cveCliente: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [cveCliente, setCveCliente] = useState<number | null>(null);

  const login = (token: string, cveCliente: number) => {
    setToken(token);
    setCveCliente(cveCliente);
  };

  const logout = () => {
    setToken(null);
    setCveCliente(null);
  };

  return (
    <AuthContext.Provider value={{ token, cveCliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
