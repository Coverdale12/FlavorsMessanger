import { formatDateToDayMonth } from "@global/Time"
import "./Message.scss"

export default function MessageDate({ date }) {
  return (
    <div className="message-date">
      <time dateTime={date} className="message-date__object">
        {formatDateToDayMonth(date)} 
      </time>
    </div>
  )
}