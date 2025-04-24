from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # Эндпоинт для проверки онлайна пользователя
    re_path(r"ws/online/(?P<user_id>\w+)/$", consumers.ChatConsumer.as_asgi()),
    
    # Эндпоинт для конкретного чата
    re_path(r"ws/chat/(?P<user_id>\w+)/$", consumers.ChatConsumer.as_asgi())
]