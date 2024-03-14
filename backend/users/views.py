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
    





