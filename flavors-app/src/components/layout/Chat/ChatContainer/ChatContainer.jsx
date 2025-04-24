import "./ChatContainer.scss"
import Message from "./Message"
import MessageDate from "./MessageDate"
import MessageUser from "./MessageUser"
import { useMessages } from "@context/MessageContext"
import { useDate } from "@context/DateContext"


export default function ChatContainer() {
  const { messages } = useMessages();
  // const { nowDate } = useDate();

  return (
    <div className="chat-container">
      <div className="chat-container__wrapper" data-js-message-container>
        {messages.length === 0 ? (
          <div className="chat-container__placeholder">Здесь пока ничего нет...</div>
        ) : (
          <>
            {messages.map((msg, index) => {
              
              if (msg.type === "you" || msg.sender.id === JSON.parse(localStorage.getItem("user_data")).id) {
                return (
                  <Message message={msg} key={index}/>
                )
              } else {
                return (
                  <MessageUser message={msg} key={index}/>
                )
              }
            }
            )}
          </>
        )}
      </div>
    </div>
  );
}

