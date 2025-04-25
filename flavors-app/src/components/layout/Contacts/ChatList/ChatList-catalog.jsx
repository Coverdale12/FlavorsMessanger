import ChatCard from "../Card/Card";
import "./ChatList-catalog.scss"
import { useChatContext } from "@context/ChatContext";

export default function ChatListCatalog({ title, peopleArray }) {
  const { openChat } = useChatContext()

  return (
    <div className="catalog border-radius-layout" data-js-catalog="">
      <h1 className="catalog__title">
        {title}
      </h1>
      <ul className="catalog__list">
        {peopleArray.map((user, index) =>
          <li className="catalog__item" key={index}>
            <ChatCard 
              jsonStringDataUser = {JSON.stringify(user)}
              title={user.username} 
              time="Today, 9.52pm" 
              lastMessage="message"
              lastMessageStatus="checked" 
              onClick={() => openChat()} />
          </li>
        )}
      </ul>
    </div>
  )
}