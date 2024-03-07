from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from django.shortcuts import render
from Admin_Side.serializers import PackageSerializer,ItinararySerializer,BookingSerializer
from rest_framework import generics
from Admin_Side.models import Packages,Itinarary,Booking
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import stripe
from django.shortcuts import redirect
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



class PackageListView(generics.ListCreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

class packageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer



class ItineraryListView(generics.ListCreateAPIView):
    queryset = Itinarary.objects.all()
    serializer_class = ItinararySerializer
    
class ItineraryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Itinarary.objects.all()
    serializer_class = ItinararySerializer



class BookingListView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer  

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

















# class StripeCheckoutSession(APIView):
#     def post(self, request, *args, **kwargs):
#         booking_id = self.kwargs['pk']

#         try:
#             booking = Booking.objects.get(id=booking_id)
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data':{
#                             'currency':'usd',
#                             'unit_amount': int(booking.total) * 100,
#                             'package_data':{
#                                 'name':booking.package.package_name,
#                             } 
#                         },
#                         'quantity':1
#                     },
#                 ],
#                 mode='payment',
#                 metadata={
#                     'package_id':booking.id
#                 },
#                 success_url = settings.SITE_URL +'?success=true',
#                 cancel_url = settings.SITE_URL +'?cancel=true'
#             ) 

#             return redirect(checkout_session.url)

#         except Exception as e: 
#             return Response({'msg':'something went wrong while session','error':str(e)}, status=500)   





