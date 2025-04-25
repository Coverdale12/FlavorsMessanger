import "./Message.scss"
import { useState } from "react"
import { parseTimestampToTime, parseTimestampToDate } from "@global/Time"


export default function Message({ message }) {
  const [stateMessage, setStateMessage] = useState("")
  
  const messageData = {
    text: message.text,
    time: parseTimestampToTime(message.timestamp),
    date: parseTimestampToDate(message.timestamp),
    status: ""
  }

  return (
    <div className="message you" data-json-js={messageData}>
      <article className="message__object">
        <div className="message__content">
          {messageData.text}
        </div>
        <div className="card__last-message message__details" data-js-message={stateMessage}>
          <time dateTime={messageData.date} className="message__time">
            {messageData.time}
          </time>
        </div>
      </article>
    </div>
  )
}