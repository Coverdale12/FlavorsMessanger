import ChatHeader from "./ChatHeader/ChatHeader";
import ChatEntry from "./ChatEntry/ChatEntry";
import ChatContainer from "./ChatContainer/ChatContainer"

import "./Chat.scss";
import { useEffect} from "react";
import { useChatContext } from "@context/ChatContext";
import { useMessages } from "@context/MessageContext";
import { apiUrl } from "@global/Variables";

import { getDataFromAPI } from "@services/FetchAPI";
import { useAuth } from "@context/AuthContext";

export default function Chat() {
  const { user } = useAuth();
  const { stateChat } = useChatContext();
  const { setMessages } = useMessages();
  

  useEffect(() => {
    // Если нету чата выйти из функции
    if (!stateChat) {
      return
    }
    getDataFromAPI(`${apiUrl}/chat/chat-messages/${stateChat.id}/${user.id}/`, user.access)
      .then((data) => {setMessages(data)})
      .catch((err) => {
        console.log(err)      
      });

  }, [stateChat])

  
  return (
    <>
      {stateChat ? (
        <main id={JSON.stringify(stateChat)} className="chat box-shadow__base border-radius-layout__base">
          <ChatHeader username={stateChat.username} />
          <ChatContainer />
          <ChatEntry userId={stateChat.id} />
        </main>
      ) : (
        <main className="chat">
        </main>
      )}
    </>
  )
}