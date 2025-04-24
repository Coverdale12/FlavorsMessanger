import Avatar from "./Avatar/Avatar"
import Navigation from "./Navigation/Navigation"
import "./Aside.scss"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@context/AuthContext"
import { getDataUser } from "@services/FetchAPI"

export default function Aside(){
  const [user, setUser] = useState("")
  useEffect(() => {
    getDataUser().then((data) => {
      setUser(data)
    })
  }, [])

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