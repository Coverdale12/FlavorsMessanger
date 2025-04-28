import { createContext, useContext, useState, useEffect } from 'react';
import { apiUrl } from '@global/Variables';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userDataFromLocalStorage = localStorage.getItem("user_data")
    return JSON.parse(userDataFromLocalStorage)
  }); // Текущий пользователь
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("user_data"))); // Состояние авторизации
  
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
      // Запись пользователя в контекст, localStorage и свитч авторизации с false на true
      setUser(user);
      setIsAuthenticated(true);
      writeInLocalStorage(user);

      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // Выход пользователя
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user_data")
  };
  // Записать данные в localStorage
  const writeInLocalStorage = (user) => localStorage.setItem("user_data", JSON.stringify(user))
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);