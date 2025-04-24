import ChatHeader from "./ChatHeader/ChatHeader";
import ChatEntry from "./ChatEntry/ChatEntry";
import ChatContainer from "./ChatContainer/ChatContainer"
import "./Chat.scss";
import { useEffect, useState } from "react";
import { useChatContext } from "@context/ChatContext";
import { useMessages } from "@context/MessageContext";
import { getAllMessageChat } from "@services/FetchAPI";


export default function Chat() {
  const { stateChat } = useChatContext();
  const { setMessages, messages } = useMessages();

  useEffect(() => {
    const userDataChat = JSON.parse(stateChat)
    const youUserId = JSON.parse(localStorage.getItem("user_data")).id

    // Если нету чата выйти из функции
    if(!stateChat){
      return
    }

    getAllMessageChat(userDataChat.id, youUserId).then((data) => {
      setMessages(data)
    })
  }, [stateChat])

  const { username, id } = JSON.parse(stateChat)

  return (
    <>
      {stateChat ? (
        <main id={stateChat} className="chat box-shadow__base border-radius-layout__base">
          <ChatHeader username={username}/>
          <ChatContainer/>
          <ChatEntry userId={id}/>
        </main>
      ) : (
        <main className="chat">
        </main>
      )}
    </>
  )
}