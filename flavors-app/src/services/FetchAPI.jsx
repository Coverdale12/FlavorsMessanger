import { apiUrl } from "../global/Variables";

export async function getTokens(username, password) {
  try {
    const response = await fetch(`${apiUrl}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка авторизации ${response.status}`);
    }
    const data = await response.json();
    return data

  } catch (error) {
    console.error('Ошибка при входе:', error);
    throw error;
  }
}
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
export async function getAllChats(id) {
  const accessToken = localStorage.getItem("access_token")
  try {
    const response = await fetch(`${apiUrl}/chat/user/${id}/chats/`,{
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
export async function getAllMessageChat(sender_id, receiver_id) {
  const accessToken = localStorage.getItem("access_token")
  try {
    const response = await fetch(`${apiUrl}/chat/chat-messages/${sender_id}/${receiver_id}/`,{
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