from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from users.models import User
from rest_framework import serializers
from .models import Category,Packages,PackageImages


class UserDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'


class PackageImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = PackageImages
    fields = ["id", "package", "image"]    


class PackageSerializer(serializers.ModelSerializer):
  images = PackageImageSerializer(many=True, read_only=True)

  class Meta:
    model = Packages
    fields = ["id", "package_name", "duration", "price", "sale_price", "overview", "category","image", "images","city","rating","is_active"]

  def create(self, validated_data):
    package = Packages.objects.create(**validated_data)
    return package
 

class AdminPackageListSerializer(PackageSerializer):
  category_name = serializers.CharField(source='category.category_name', read_only=True)
  class Meta:
    model = Packages
    fields = ["id", "package_name", "duration", "price", "sale_price", "category","category_name", "image", "images","city","rating","is_active"]  

