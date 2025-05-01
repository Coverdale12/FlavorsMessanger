import { useContext, useEffect } from 'react'

import Aside from '@components/layout/Aside/Aside'
import Contacts from '@components/layout/Contacts/Contacts'
import Chat from '@components/layout/Chat/Chat'
import Login from '@components/pages/Login/Login'
import Account from '@components/pages/Account/Account'


import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom'; // Импортируем компоненты Router

import { AuthProvider } from '@context/AuthContext'
import { MessageProvider } from '@context/MessageContext';
import { ChatProvider } from '@context/ChatContext'
import { WebSocketProvider } from '@context/WebSocketContext'

import "./sass/app.scss"
import { useAuth } from './context/AuthContext'
import { useWebSocket } from './context/WebSocketContext'



// Главный компонент App не использует контекст напрямую
export default function App() {
  return (
    <AuthProvider> {/* Провайдер оборачивает всё приложение */}
      <MessageProvider>
        <BrowserRouter> {/* Оборачиваем приложение в BrowserRouter */}
          <Routes> {/* Определяем маршруты */}
            <Route path="/login" element={<Login />} /> {/* Страница входа */}
            <Route path="/" element={<ProtectedRoute />}> {/* Защищённый маршрут */}
              <Route path="account" element={<Account />} /> {/* Главная страница */}
              <Route index element={<MessagesPage />} />
              <Route path="messages" element={<MessagesPage />} /> {/* Страница сообщений */}
              <Route path="notifications" element={<NotificationsPage />} /> {/* Страница уведомлений */}
              <Route path="options" element={<OptionsPage />} /> {/* Страница настроек */}
            </Route>
            <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправление на главную страницу для несуществующих маршрутов */}
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  );
}

// Вложенный компонент, который использует контекст при проверки на аутентификацию
function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // Получаем состояние аутентификации

  return isAuthenticated ? (
    <WebSocketProvider>
      <ChatProvider> {/* Если пользователь авторизован, показываем основное приложение */}
        <Layout />
      </ChatProvider>
    </WebSocketProvider>
  ) : <Navigate to="/login" />;
}

// Общий макет с Aside
function Layout() {
  const { user } = useAuth();
  const { connectToWebSocket, WebSocketAPI } = useWebSocket();

  // Соединение с веб сокет сервером
  useEffect(() => {
    const webSocketServer = connectToWebSocket(user.id, user.access)
  }, [])

  return (
    <>
      <Aside /> {/* Aside всегда отображается */}
      <>
        <Outlet /> {/* Вложенные маршруты отображаются здесь */}
      </>
    </>
  );
}

// Страница сообщений
function MessagesPage() {
  return (
    <>
      <Contacts />
      <Chat />
    </>
  );
}

// Страница уведомлений
function NotificationsPage() {
  return <div>Уведомления</div>;
}

// Страница настроек
function OptionsPage() {
  return <div>Настройки</div>;
}