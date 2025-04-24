from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import MessageSerializer
from .models import Message
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

class CurrentUserView(APIView):
    # permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class ChatMessagesView(APIView):
    # authentication_classes = []  # Если нужно аутентификацию, добавьте [TokenAuthentication]
    # permission_classes = []  # Если нужно разрешение, добавьте [IsAuthenticated]
    
    def get(self, request, sender_id, receiver_id):
        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if request.user.id not in [sender_id, receiver_id]:
            return Response({'error': 'You are not authorized to view this chat'}, status=status.HTTP_403_FORBIDDEN)

        # Получаем все сообщения между sender и receiver
        messages = Message.objects.filter(
            sender__in=[sender, receiver],
            receiver__in=[sender, receiver]
        ).order_by('timestamp')

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(username=username, password=make_password(password))
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

class MessageListView(APIView):
    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

class UserChatListView(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Получаем все сообщения, связанные с пользователем
        sent_messages = Message.objects.filter(sender=user)
        received_messages = Message.objects.filter(receiver=user)

        # Объединяем и удаляем дубликаты
        unique_chats = set()
        for message in sent_messages:
            if message.receiver:
                unique_chats.add(message.receiver.id)

        for message in received_messages:
            if message.sender:
                unique_chats.add(message.sender.id)

        # Убираем самого пользователя из списка чатов
        unique_chats.discard(user.id)

        # Преобразуем список пользователей в формат JSON
        chat_users = User.objects.filter(id__in=unique_chats)
        chat_users_data = [{'id': u.id, 'username': u.username} for u in chat_users]

        return Response(chat_users_data, status=status.HTTP_200_OK)

class CreateChatView(APIView):
    def post(self, request):
        # Получаем ID текущего пользователя и ID пользователя-получателя
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')

        if not sender_id or not receiver_id:
            return Response({'error': 'Sender and receiver IDs are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Проверяем, есть ли уже сообщения между этими пользователями
        existing_messages = Message.objects.filter(sender__in=[sender, receiver], receiver__in=[sender, receiver])

        if existing_messages.exists():
            return Response({
                'message': 'Chat already exists',
                'chat': {
                    'sender': sender.username,
                    'receiver': receiver.username
                }
            }, status=status.HTTP_200_OK)

        # Если чат не существует, создаем первое сообщение (например, пустое или приветственное)
        initial_message = Message.objects.create(
            sender=sender,
            receiver=receiver,
            text="Chat initialized"
        )

        return Response({
            'message': 'Chat created successfully',
            'chat': {
                'sender': sender.username,
                'receiver': receiver.username,
                'initial_message': initial_message.text
            }
        }, status=status.HTTP_201_CREATED)
    
class DeleteChatView(APIView):
    def delete(self, request, sender_id, receiver_id):
        try:
            sender = User.objects.get(id=sender_id)
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Удаляем все сообщения между sender и receiver
        deleted_count, _ = Message.objects.filter(
            sender__in=[sender, receiver],
            receiver__in=[sender, receiver]
        ).delete()

        if deleted_count > 0:
            return Response({'message': f'{deleted_count} messages deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No messages to delete'}, status=status.HTTP_200_OK)    