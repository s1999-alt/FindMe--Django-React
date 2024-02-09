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
  # category = CategorySerializer()
  images = PackageImageSerializer(many=True, read_only=True)
  # uploaded_images = serializers.ListField(
  #   child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
  #   write_only = True
  # )

  class Meta:
    model = Packages
    fields = ["id", "package_name", "duration", "price", "sale_price", "overview", "category","image", "images"]

  def create(self, validated_data):
    # uploaded_images = validated_data.pop("uploaded_images")
    package = Packages.objects.create(**validated_data)
    # for image in uploaded_images:
    #   new_package_image = PackageImages.objects.create(package=package, image = image)
    return package  

