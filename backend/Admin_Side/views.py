from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token
from users.models import User
from django.http import JsonResponse
from rest_framework import generics
from .serializers import UserDetailsSerializer

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