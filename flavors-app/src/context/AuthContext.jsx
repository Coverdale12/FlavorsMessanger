import { createContext, useContext, useState } from 'react';
import { apiUrl } from '@global/Variables';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Текущий пользователь
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  
  // Вход пользователя
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${apiUrl}/api/token/`, { username, password });
      const { data: userData } = await axios.get(`${apiUrl}/chat/user/me/`, {
        headers: {
          "Authorization": `Bearer ${data.access}`
        }
      });

      const user = {
        access: data.access,
        refresh: data.refresh,
        username,
        ...userData
      };
      // Запись пользователя в контекст
      setUser(user);
      setIsAuthenticated(true);

      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // Выход пользователя
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);