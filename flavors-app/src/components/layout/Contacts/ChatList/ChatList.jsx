import ChatListCatalog from "./ChatList-catalog"
import "./ChatList.scss"
import { apiUrl } from "@global/Variables"
import { useFetch } from "@hooks/useFetch"
import useLocalStorage from "@hooks/useLocalStorage"
import { Navigate } from "react-router-dom"
import { useAuth } from "@context/AuthContext"


export default function ChatList({ chats }) {
  const {user} = useAuth();
  const [userData, _] = useLocalStorage("user_data")
  const {data, error, loading} = useFetch(`${apiUrl}/chat/user/${user.id}/chats/`)
  
  if(error){
    return(
      error.status === 401 && <Navigate to="/login" replace />
    )
  }
  return (
    <div className="chatlist box-shadow__base border-radius-layout__base">
      {loading && <div className="chatlist__loading">Загрузка</div>}
      {error && <div className="chatlist__error">Ошибка: {error}</div>}
      {data && (
        <ChatListCatalog title="People" peopleArray={data} />
      )}
    </div>
  )
}