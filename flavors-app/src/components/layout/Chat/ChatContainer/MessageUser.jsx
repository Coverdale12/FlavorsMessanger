import { useState } from "react"
import {parseTimestampToTime, parseTimestampToDate} from "@global/Time"

export default function MessageUser({ message }) {
  const [stateMessage, setStateMessage] = useState("")

  
  const jsonData = {
    text: message.text,
    time: parseTimestampToTime(message.timestamp),
    date: parseTimestampToDate(message.timestamp),
    status: ""
  }
  const jsonString = JSON.stringify(jsonData)

  return (
    <div className="message" data-json-js={jsonString}>
      <article className="message__object">
        <div className="message__content">
          {jsonData.text}
        </div>
        <div className="card__last-message message__details">
          <time dateTime={jsonData.date} className="message__time">
            {jsonData.time}
          </time>

        </div>
      </article>
    </div>
  )
}