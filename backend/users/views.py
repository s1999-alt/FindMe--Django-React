from django.shortcuts import render
from Admin_Side.serializers import PackageSerializer,ItinararySerializer
from rest_framework import generics
from Admin_Side.models import Packages,Itinarary
from rest_framework.response import Response
from rest_framework import status



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




