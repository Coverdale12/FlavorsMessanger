import { createContext, useContext, useState } from 'react';
import { apiUrl } from '@global/Variables';
import { getTokens, getDataUser } from '@services/FetchAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Текущий пользователь
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('refresh_token')); // Состояние авторизации

  // Вход пользователя
  async function login(username, password){
    return getTokens(username, password).then((data) => {
      localStorage.setItem('access_token', data.access); // Сохраняем Access Token
      localStorage.setItem('refresh_token', data.refresh); // Сохраняем Refresh Token
      setIsAuthenticated(true); // Устанавливаем состояние авторизации
      getDataUser().then((data) => {
        localStorage.setItem("user_data", JSON.stringify(data))
        location.reload()
      })
    }).catch((error) => {
      throw new Error(error)
    })
  };
  // Выход пользователя
  function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem("user_data");
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