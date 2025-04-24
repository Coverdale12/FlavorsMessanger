import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const ChatContext = createContext();

// Провайдер контекста
export function ChatProvider({ children }) {
  const [stateChat, setStateChat] = useState(false);

  const openChat = (dataJsonUser) => setStateChat(dataJsonUser);
  const closeChat = () => setStateChat(false);

  return (
    <ChatContext.Provider value={{ stateChat, setStateChat, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

// Хук для использования контекста
export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext должен использоваться внутри ChatProvider");
  }
  return context;
}