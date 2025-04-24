import ChatList from "./ChatList/ChatList";
import Search from "./Search/Search";
import "./Contacts.scss"


export default function Contacts(){
  return(
    <div className="contacts">
      <Search/>
      <ChatList/>
    </div>
  )
}