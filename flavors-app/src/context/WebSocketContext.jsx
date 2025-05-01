import { createContext, useContext, useState } from "react";
import { wsUrl } from "@global/Variables"

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [WebSocketAPI, setConnect] = useState(false)

  const connectToWebSocket = (id, token) => {
    const wsServer = new WebSocket(`${wsUrl}/ws/chat/${id}/?token=${token}`)
    setConnect(wsServer)
    return wsServer
  }

  return (
    <WebSocketContext.Provider value={{ connectToWebSocket, WebSocketAPI }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => useContext(WebSocketContext);