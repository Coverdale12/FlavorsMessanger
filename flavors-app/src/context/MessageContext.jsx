import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);


export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  
  return (
    <MessageContext.Provider value={{ messages, addMessage, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
