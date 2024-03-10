from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token
from users.models import User
from .models import Packages, Category, Hotels,Booking
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework import generics
from .serializers import UserDetailsSerializer,CategorySerializer,AdminPackageListSerializer,PackageSerializer,AdminHotelSerializer,BookingSerializer
import stripe
from django.conf import settings


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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        image = request.data.get('image')
        if image:
            if not image.content_type.startswith('image'):
                return Response({'image': ['Invalid image format. Only images are allowed.']}, status=status.HTTP_400_BAD_REQUEST)
            
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)   

class AdminPackageListView(generics.ListAPIView):
    queryset = Packages.objects.all()
    serializer_class = AdminPackageListSerializer

class PackageUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

class PackageBlockUnblockView(generics.RetrieveUpdateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer 

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = not instance.is_active
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)   





class AdminHotelCreateView(generics.CreateAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelListView(generics.ListAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  Hotels.objects.all()  
    serializer_class = AdminHotelSerializer



stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            booking_id = request.data.get('booking_id')
            booking = Booking.objects.get(id=booking_id)
            package = booking.package

            # customer_name = booking.full_name
            # customer_address = booking.full_name

            image_url = request.build_absolute_uri(package.image.url)


            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data' : {
                            'currency': 'inr',
                            'product_data':{
                                'name': package.package_name,
                                'images': [image_url],
                            },
                            'unit_amount': int(booking.total * 100),
                        },
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card',],
                mode='payment',
                success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=True',
                customer_email=booking.email,
                billing_address_collection='required',
                payment_intent_data={
                    'description': f'Booking ID: {booking.id}',
                },
            )
            return redirect(checkout_session.url)
        except:
            return Response(
                {'error':'something went wrong....'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )