import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    online_users = set()  # Хранилище онлайн-пользователей
    chat_groups = {}  # Хранилище групп чатов

    async def connect(self):
        """Обработка подключения WebSocket"""
        # Получаем user_id из параметров URL-маршрута (например, ws/chat/<user_id>/)
        self.user_id = self.scope["url_route"]["kwargs"].get("user_id")

        # Если user_id не указан, закрываем соединение
        if not self.user_id:
            await self.close()
            return

        # Добавляем пользователя в множество онлайн-пользователей
        self.online_users.add(self.user_id)

        # Создаем уникальное имя группы для данного пользователя (например, "chat_user_<user_id>")
        self.chat_group_name = f"chat_user_{self.user_id}"

        # Присоединяемся к группе чата этого пользователя
        await self.channel_layer.group_add(self.chat_group_name, self.channel_name)

        # Принимаем соединение
        await self.accept()

    async def disconnect(self, close_code):
        """Обработка разрыва соединения WebSocket"""
        # Удаляем пользователя из множества онлайн-пользователей
        if self.user_id in self.online_users:
            self.online_users.remove(self.user_id)

        # Если пользователь был присоединен к группе чата, покидаем её
        if hasattr(self, 'chat_group_name'):  # Проверяем наличие атрибута (на случай ошибок)
            await self.channel_layer.group_discard(self.chat_group_name, self.channel_name)

    async def receive(self, text_data):
        """Обработка получения данных от клиента"""
        data = json.loads(text_data)  # Парсим JSON-данные, отправленные клиентом

        # Извлекаем данные из полученного JSON
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        text = data.get("text")

        # Проверяем корректность данных
        if not sender_id or not receiver_id or not text:
            await self.send(json.dumps({"error": "Invalid message format"}))  # Отправляем ошибку, если данные некорректны
            return

        # Сохраняем сообщение в базе данных
        message = await self.save_message(sender_id, receiver_id, text)

        # Отправляем сообщение в группу чата получателя
        await self.send_message_to_chat(sender_id, receiver_id, text, message.timestamp)

    @staticmethod
    def get_chat_group_name(user_id):
        """Генерация уникального имени группы для чата между двумя пользователями"""
        return f"chat_user_{user_id}"  # Группа чата имеет формат "chat_user_<id>", где <id> — это ID пользователя

    async def send_message_to_chat(self, sender_id, receiver_id, text, timestamp):
        """Отправка сообщения в группу чата получателя"""
        # Генерируем имя группы чата получателя
        group_name = self.get_chat_group_name(receiver_id)

        # Отправляем событие в группу чата получателя
        await self.channel_layer.group_send(
            group_name,
            {
                "type": "chat.message",  # Тип события, которое будет обработано методом chat_message
                "sender": sender_id,  # ID отправителя
                "receiver": receiver_id,  # ID получателя
                "text": text,  # Текст сообщения
                "timestamp": str(timestamp),  # Время создания сообщения
            },
        )

    async def chat_message(self, event):
        """Обработка события 'chat.message' для отправки сообщения клиенту"""
        # Отправляем сообщение клиенту через WebSocket
        await self.send(
            json.dumps(
                {
                    "sender": event["sender"],  # ID отправителя
                    "receiver": event["receiver"],  # ID получателя
                    "text": event["text"],  # Текст сообщения
                    "timestamp": event["timestamp"],  # Время создания сообщения
                }
            )
        )

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, text):
        """Асинхронное сохранение сообщения в базе данных"""
        # Получаем объекты отправителя и получателя из базы данных
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(id=receiver_id)

        # Создаем новое сообщение и сохраняем его в базе данных
        return Message.objects.create(sender=sender, receiver=receiver, text=text)