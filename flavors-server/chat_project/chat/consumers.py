import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Message
from django.contrib.auth.models import AnonymousUser

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    online_users = set()

    async def connect(self):
        # Получаем пользователя из scope (добавлено аутентификации)
        self.user = self.scope.get("user", AnonymousUser())
        
        # Если пользователь не аутентифицирован, закрываем соединение
        if not self.user.is_authenticated:
            await self.close(code=403)  # Закрываем с кодом 403
            return

        # Получаем user_id из URL
        self.user_id = self.scope["url_route"]["kwargs"].get("user_id")
        
        # Проверяем, что user_id соответствует текущему пользователю
        if str(self.user.id) != str(self.user_id):
            await self.close()
            return

        # Добавляем пользователя в онлайн
        self.online_users.add(self.user_id)

        # Группа для пользователя
        self.chat_group_name = f"chat_user_{self.user_id}"
        
        # Добавляем в группу
        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Удаляем пользователя из онлайн
        if hasattr(self, 'user_id') and self.user_id in self.online_users:
            self.online_users.remove(self.user_id)

        # Удаляем из группы
        if hasattr(self, 'chat_group_name'):
            await self.channel_layer.group_discard(
                self.chat_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            sender_id = data.get("sender_id")
            receiver_id = data.get("receiver_id")
            text = data.get("text")

            # Проверки
            if not all([sender_id, receiver_id, text]):
                await self.send(json.dumps({"error": "Invalid message format"}))
                return

            # Проверка прав отправителя
            if str(self.user.id) != str(sender_id):
                await self.send(json.dumps({"error": "Permission denied"}))
                return

            # Сохраняем сообщение
            message = await self.save_message(sender_id, receiver_id, text)

            # Отправляем получателю
            await self.send_message_to_chat(sender_id, receiver_id, text, message.timestamp)

        except Exception as e:
            await self.send(json.dumps({"error": str(e)}))

    async def send_message_to_chat(self, sender_id, receiver_id, text, timestamp):
        group_name = f"chat_user_{receiver_id}"
        await self.channel_layer.group_send(
            group_name,
            {
                "type": "chat.message",
                "sender": sender_id,
                "receiver": receiver_id,
                "text": text,
                "timestamp": str(timestamp),
            }
        )

    async def chat_message(self, event):
        await self.send(json.dumps({
            "sender": event["sender"],
            "receiver": event["receiver"],
            "text": event["text"],
            "timestamp": event["timestamp"],
        }))

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, text):
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(id=receiver_id)
        return Message.objects.create(sender=sender, receiver=receiver, text=text)