from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.db import database_sync_to_async

class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Извлечение токена из query-параметров
        query_string = scope.get("query_string", b"").decode()
        query_params = {}
        
        if query_string:
            # Разделяем параметры через "&" как строки, а не байты
            for pair in query_string.split("&"):
                if "=" in pair:
                    key, value = pair.split("=", 1)
                    query_params[key] = value

        token = query_params.get("token")

        if not token:
            # Альтернативно попробовать извлечь из заголовков (если используется HTTP-заголовок)
            headers = dict(scope['headers'])
            auth_header = headers.get(b'authorization', b'').decode()
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if token:
            try:
                user = await self.get_user(token)
                scope['user'] = user
            except Exception as e:
                print("JWT validation error:", e)
                scope['user'] = AnonymousUser()
        else:
            scope['user'] = AnonymousUser()
        
        return await self.inner(scope, receive, send)

    @database_sync_to_async
    def get_user(self, token_key):
        jwt_auth = JWTAuthentication()
        try:
            validated_token = jwt_auth.get_validated_token(token_key)
            return jwt_auth.get_user(validated_token)
        except Exception as e:
            print("Token validation failed:", e)
            return AnonymousUser()