from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from rest_framework.authtoken.models import Token
from users.models import User
from .models import Packages, Category, Hotels, Booking, Wallet
from django.http import JsonResponse
from django.shortcuts import redirect
from rest_framework import generics
from .serializers import UserDetailsSerializer,CategorySerializer,AdminPackageListSerializer,PackageSerializer,AdminHotelSerializer
import stripe
from django.conf import settings
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_str
from django.contrib.auth import get_user_model





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


class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if user and user.is_staff:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f'<a href="http://localhost:5173/admin/password-reset/{uid}/{token}/">Click here to reset your password</a>'


            send_mail(
                'Password Reset',
                f'Click the following link to reset your password: {reset_link}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
                html_message=f'Click the following link to reset your password: {reset_link}',
            )

            return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        

class PasswordResetView(APIView):
    def post(self, request, uidb64, token):
        password = request.data.get('password')
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({'message': 'Password reset successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)




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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        category_image = request.data.get('image')
        if category_image:
            if not category_image.content_type.startswith('image'):
                return Response({'category_image': ['Invalid image format. Only images are allowed.']}, status=status.HTTP_400_BAD_REQUEST)
            
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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



User = get_user_model()

stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            print("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr____iddddd",user_id)
            booking_id = request.data.get('booking_id')
            print(f"Retrieved booking ID from session metadata: {booking_id}")
            booking = Booking.objects.get(id=booking_id)
            package = booking.package

            image_url = request.build_absolute_uri(package.image.url)
            print(image_url)

            if booking.status == 'Payment Complete':
                return Response(
                    {'warning' : 'This booking has already been paid for..'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if request.data.get('use_wallet'):
                user = User.objects.get(id=user_id)
                wallet = Wallet.objects.get(user=user)
                if wallet.balance >= booking.total:
                    with transaction.atomic():
                        booking.status = 'Payment Complete'
                        booking.save()
                        wallet.balance -= booking.total
                        wallet.save()
                    return redirect('http://localhost:5173/success?success=true')    
                else:
                    booking.total -= wallet.balance 

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
                        payment_method_types=['card'],
                        mode='payment',
                        success_url='http://localhost:8000/api/v1/admin/stripe-success/?session_id={CHECKOUT_SESSION_ID}',
                        cancel_url=settings.SITE_URL + '/?canceled=True',
                        customer_email=booking.email,
                        billing_address_collection='required',
                        payment_intent_data={
                            'description': f'Booking ID: {booking.id}',
                        },
                        metadata={
                            'booking_id': booking.id,
                        },

                    )

                    return redirect(checkout_session.url)
            else:
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
                        payment_method_types=['card'],
                        mode='payment',
                        success_url='http://localhost:8000/api/v1/admin/stripe-success/?session_id={CHECKOUT_SESSION_ID}',
                        cancel_url=settings.SITE_URL + '/?canceled=True',
                        customer_email=booking.email,
                        billing_address_collection='required',
                        payment_intent_data={
                            'description': f'Booking ID: {booking.id}',
                        },
                        metadata={
                            'booking_id': booking.id,
                        },

                )
                return redirect(checkout_session.url)    

        except Exception as e:
            print(f"Error in StripeCheckoutView: {str(e)}")
            return Response(
                {'error':'something went wrong....'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class StripeSuccessView(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get('session_id')

            print("====================",session_id)
            # Retrieve the session from Stripe to confirm payment success
            session = stripe.checkout.Session.retrieve(session_id)

            # Get the booking ID from the session's metadata
            booking_id = session.metadata.get('booking_id')

            print("==========================",booking_id)
            
            # Update the booking status to 'Payment Complete'
            with transaction.atomic():
                booking = Booking.objects.get(id=booking_id)
                booking.status = 'Payment Complete'
                booking.save()

            return redirect('http://localhost:5173/success?success=true')

        except stripe.error.StripeError as e:
            # Handle Stripe errors if necessary
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )          

















# stripe.api_key = settings.STRIPE_SECRET_KEY

# class StripeCheckoutView(APIView):
#     def post(self, request):
#         try:
#             booking_id = request.data.get('booking_id')
#             print(f"Retrieved booking ID from session metadata: {booking_id}")
#             booking = Booking.objects.get(id=booking_id)
#             package = booking.package

#             image_url = request.build_absolute_uri(package.image.url)
#             print(image_url)

#             if booking.status == 'Payment Complete':
#                 return Response(
#                     {'warning' : 'This booking has already been paid for..'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )

#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data' : {
#                             'currency': 'inr',
#                             'product_data':{
#                                 'name': package.package_name,
#                                 'images': [image_url],
#                             },
#                             'unit_amount': int(booking.total * 100),
#                         },
#                         'quantity': 1,
#                     },
#                 ],
#                 payment_method_types=['card'],
#                 mode='payment',
#                 success_url='http://localhost:8000/api/v1/admin/stripe-success/?session_id={CHECKOUT_SESSION_ID}',
#                 cancel_url=settings.SITE_URL + '/?canceled=True',
#                 customer_email=booking.email,
#                 billing_address_collection='required',
#                 payment_intent_data={
#                     'description': f'Booking ID: {booking.id}',
#                 },
#                 metadata={
#                     'booking_id': booking.id,
#                 },

#             )

#             return redirect(checkout_session.url)
#         except Exception as e:
#             print(f"Error in StripeCheckoutView: {str(e)}")
#             return Response(
#                 {'error':'something went wrong....'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )