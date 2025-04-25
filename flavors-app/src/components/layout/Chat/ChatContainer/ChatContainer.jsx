import "./ChatContainer.scss"
import Message from "./Message"
import MessageUser from "./MessageUser"
import { useMessages } from "@context/MessageContext"
import useLocalStorage from "@hooks/useLocalStorage"

export default function ChatContainer() {
  const { messages } = useMessages();
  const [userData, _] = useLocalStorage("user_data")

  const MessagesList = () => {
    return (
      <>
        {messages.map((msg, index) =>
          msg.type === "you" || msg.sender.id === JSON.parse(localStorage.getItem("user_data"))?.id
            ? <Message message={msg} key={index} />
            : <MessageUser message={msg} key={index} />
        )}
      </>
    )
  }


  return (
    <div className="chat-container">
      <div className="chat-container__wrapper" data-js-message-container>
        {messages.length === 0 ? (
          <div className="chat-container__placeholder">Здесь пока ничего нет...</div>
        ) : (
          <MessagesList />
        )}
      </div>
    </div>
  );
}

