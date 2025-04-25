import Avatar from "../../Aside/Avatar/Avatar";
import { useState } from "react";
import "./Card.scss"

import { useChatContext } from "@context/ChatContext";

export default function ChatCard({ title, time, lastMessage, lastMessageStatus, jsonStringDataUser }) {
  const { openChat } = useChatContext();
  const dataAttrs = ["sending", "checked"]

  function handlerClickOnCard(event){
    const card = event.target.closest("[data-js-userdata]")

    openChat(card.dataset.jsUserdata)
  }

  return (
    <article className="card" onClick={handlerClickOnCard} data-js-userdata={jsonStringDataUser}>
      <Avatar
        src="/src/assets/icons/aside/user-icon-avatar.png"
        alt="avatar"
        width={50}
        height={50} />
      <div className="card__body">
        <div className="card__header">
          <h2 className="card__title">
            {title}
          </h2>
          <div className="card__time">
            {time}
          </div>
        </div>
        <p className="card__last-message" data-js-message={lastMessageStatus}>
          {lastMessage}
        </p>
      </div>
    </article>
  )
}