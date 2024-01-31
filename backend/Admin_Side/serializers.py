from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from users.models import User
from rest_framework import serializers

class UserDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'