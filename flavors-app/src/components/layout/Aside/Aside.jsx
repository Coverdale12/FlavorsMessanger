import Avatar from "./Avatar/Avatar"
import Navigation from "./Navigation/Navigation"
import "./Aside.scss"
import { useAuth } from "@context/AuthContext"

export default function Aside(){
  const { user } = useAuth();
  
  return(
    <aside className="aside">
      <Avatar 
        src="/src/assets/icons/aside/user-icon-avatar.png" 
        alt={user.username + " avatar"}
        width={80}
        height={80}/>
      <Navigation />
    </aside>
  )
}