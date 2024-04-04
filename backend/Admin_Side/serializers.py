from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from users.models import User
from rest_framework import serializers
from .models import Category,Packages,PackageImages,Hotels,Inclusions,Exclusions,Itinarary,Booking,Wallet,WalletTransaction


class UserDetailsSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'  
    

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'is_superuser']


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'

  def validate_image(self, value):
    allowed_content_types = ['image/jpeg', 'image/png', 'image/gif']

    if value.content_type not in allowed_content_types:
      raise serializers.ValidationError('Invalid Image File Type. Only JPEG, PNG, and GIF are allowed')  
    return value  


class PackageImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = PackageImages
    fields = ["id", "package", "image"] 


class InclusionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Inclusions
    fields = '__all__'  


class ExclusionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Exclusions
    fields = '__all__'


class AdminHotelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hotels
    fields = '__all__'    


class PackageSerializer(serializers.ModelSerializer):
  images = PackageImageSerializer(many=True, read_only=True)
  inclusions = InclusionsSerializer(many=True, read_only=True)
  exclusions = ExclusionsSerializer(many=True, read_only=True) 
  hotels = AdminHotelSerializer(many=True, read_only=True)

  class Meta:
    model = Packages
    fields = ["id", "package_name", "duration", "price", "sale_price", "overview", "category","image", "images","city","rating","inclusions","exclusions","hotels","is_active"]

  def validate_image(self, value):
    allowed_content_types = ['image/jpeg', 'image/png', 'image/gif']

    if value.content_type not in allowed_content_types:
      raise serializers.ValidationError('Invalid Image File Type. Only JPEG, PNG, and GIF are allowed')  
    return value

  def create(self, validated_data):
    package = Packages.objects.create(**validated_data)
    return package
 

class AdminPackageListSerializer(PackageSerializer):
  category_name = serializers.CharField(source='category.category_name', read_only=True)
  class Meta:
    model = Packages
    fields = ["id", "package_name", "duration", "price", "sale_price", "category","category_name", "image", "images","city","rating","is_active"] 


class ItinararySerializer(serializers.ModelSerializer):
  package_details = PackageSerializer(source='package', read_only=True)
  class Meta:
    model = Itinarary
    fields = '__all__'



class BookingSerializer(serializers.ModelSerializer):
  package_details = PackageSerializer(source='package', read_only=True)
  user_details = UserDetailsSerializer(source='user' , read_only=True)
  class Meta:
    model = Booking
    fields = ['id','user','package','full_name','phone','email','start_date','end_date','no_of_guest','total','status','payment_method','booking_number','booking_status','wallet_paid','package_details','user_details']



class WalletSerializer(serializers.ModelSerializer):
  class Meta:
    model = Wallet
    fields = ['user','balance']

 
class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
      model = WalletTransaction
      fields = ['amount', 'transaction_type', 'timestamp']  



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'email']




    


  






