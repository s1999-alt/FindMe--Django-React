from channels.generic.websocket import AsyncWebsocketConsumer
import json
from Admin_Side.models import ChatMessage
# from .models import User
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

User = get_user_model()

class PersonalChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
        user_id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'chat_{user_id}'

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

  async def receive(self, text_data):
      data = json.loads(text_data)
      message = data['message']
      sender_email = "none"

      print("messageeeeeeeeeeeeeeeeee",data)
      print("senderrrrrrrrrrrrrrrrrrrr",sender_email)
      try:
        sender_user = await sync_to_async(User.objects.get)(email=sender_email)
      except User.DoesNotExist:
        sender_user = None

      if sender_user:
        chat_message = await sync_to_async(ChatMessage.objects.create)(
            sender=sender_user,
            message = message,
            user_id = sender_user.id,
            group = self.room_group_name
        )

      await self.channel_layer.group_send(
          self.room_group_name,
          {
              'type':'chat.message',
              'data':{
                  'message':message,
                  'sender':sender_email
              },
    })

  async def disconnect(self, close_code):
      await self.channel_layer.group_discard(
          self.room_group_name,
          self.channel_name
      )    


  async def chat_message(self, event):
        message = event['data']['message']
        sender = event['data']['sender']
        await self.send(text_data=json.dumps({
            "message":message,
            'sender':sender,
        }))


