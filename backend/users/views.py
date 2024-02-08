from django.shortcuts import render
from Admin_Side.serializers import PackageSerializer
from rest_framework import generics
from Admin_Side.models import Packages



class PackageListView(generics.ListCreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

    print(queryset)

class packageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer 
