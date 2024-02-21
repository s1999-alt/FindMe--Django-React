from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token
from users.models import User
from .models import Packages, Category, Hotels
from django.http import JsonResponse
from rest_framework import generics
from .serializers import UserDetailsSerializer,CategorySerializer,AdminPackageListSerializer,PackageSerializer,AdminHotelSerializer


class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email') 
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user and user.is_staff:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'message': 'Admin login successful','token' : token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid admin credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self, request):
        logout(request)
        return Response({'message':'Admin logout Successful'}, status=status.HTTP_200_OK)
    
class UserListView(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        data = [
            {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'phone': user.phone,
                'is_active':user.is_active,
            }
            for user in users
        ]
        return JsonResponse({'users': data}, status=status.HTTP_200_OK) 
      
class UserActiveView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    lookup_field = 'id'
  




class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_available = not instance.is_available
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CategoryDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer 

   



class PackageCreateView(generics.CreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer    

class AdminPackageListView(generics.ListAPIView):
    queryset = Packages.objects.all()
    serializer_class = AdminPackageListSerializer

class PackageUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer
    lookup_field = 'id' 




class AdminHotelCreateView(generics.CreateAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelListView(generics.ListAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  Hotels.objects.all()  
    serializer_class = AdminHotelSerializer

    
