from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from users.models import User


class UserDetailsSerializer(UserCreateSerializer):
  class Meta:
    model = User
    fields = '__all__'