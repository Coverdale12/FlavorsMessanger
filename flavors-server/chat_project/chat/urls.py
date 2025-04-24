from django.urls import path
from .views import RegisterView, CurrentUserView, MessageListView, UserChatListView, CreateChatView, DeleteChatView, ChatMessagesView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/me/', CurrentUserView.as_view(), name='current-user'), #Вся инфомрация про пользователя
    path('messages/', MessageListView.as_view(), name='message-list'),
    path('user/<int:user_id>/chats/', UserChatListView.as_view(), name='user-chat-list'), # Список всех чатов пользователя
    path('create-chat/', CreateChatView.as_view(), name='create-chat'), # Создание чата с кем то
    path('delete-chat/<int:sender_id>/<int:receiver_id>/', DeleteChatView.as_view(), name='delete-chat'), # Удаление чата
    path('chat-messages/<int:sender_id>/<int:receiver_id>/', ChatMessagesView.as_view(), name='chat-messages'),
]