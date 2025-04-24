import { useContext, useEffect, useState } from "react"
import ChatListCatalog from "./ChatList-catalog"
import "./ChatList.scss"
import { apiUrl } from "@global/Variables"
import { getAllChats } from "@services/FetchAPI"
import { AuthContext } from "@context/AuthContext"

export default function ChatList({ chats }) {
  const [userId, setUserId] = useState(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.id || null;
      } catch (error) {
        console.error("Ошибка парсинга user_data:", error);
        return null;
      }
    }
    return null;
  });

  const [peopleArray, setPeopleArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null);

      getAllChats(userId)
        .then((data) => {
          setPeopleArray(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId])

  return (
    <div className="chatlist box-shadow__base border-radius-layout__base">
      {loading && <div className="chatlist__loading">Загрузка</div>}
      {error && <div className="chatlist__error">Ошибка: {error}</div>}
      {!loading && !error && (
        <ChatListCatalog title="People" peopleArray={peopleArray} />
      )}
    </div>
  )
}