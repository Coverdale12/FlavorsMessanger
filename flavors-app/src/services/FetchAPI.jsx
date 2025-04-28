import { apiUrl } from "@global/Variables";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export async function getDataUser() {
  const accessToken = localStorage.getItem("access_token")
  if (!accessToken) {
    throw new Error('Access token not found');
  }

  try {
    const response = await fetch(`${apiUrl}/chat/user/me/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(`Ошибка получения данных с сервера! ${response.status}`);
    }
    const data = await response.json();
    return data

  } catch (error) {
    console.error('Ошибка при получении:', error);
    throw error;
  }
}
export async function getAllMessageChat(sender_id, receiver_id) {
  const accessToken = localStorage.getItem("access_token")
  try {
    const response = await fetch(`${apiUrl}/chat/chat-messages/${sender_id}/${receiver_id}/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка получания данных с сервера! ${response.status}`);
    }
    const data = await response.json();
    return data

  } catch (error) {
    console.error('Ошибка при получении:', error);
    throw error;
  }
}

export async function getDataFromAPI(url, token = false) {
  try {
    const response = await axios.get(url, token && {
      headers: {
        Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
      },
    });
    const data = await response.data;
    return data

  } catch (error) {
    throw error;
  }
}