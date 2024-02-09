from django.shortcuts import render
from Admin_Side.serializers import PackageSerializer
from rest_framework import generics
from Admin_Side.models import Packages
from rest_framework.response import Response
from rest_framework import status



class PackageListView(generics.ListCreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

    print(queryset)

class packageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

class PackageCreateView(generics.CreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

    # def create(self, request, *args, **kwargs):
    #     try:
    #         print(request.data)  # Print the incoming request data for debugging
    #         serializer = self.get_serializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         self.perform_create(serializer)
    #         headers = self.get_success_headers(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    #     except Exception as e:
    #         print(f"Exception during package creation: {e}")
    #         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)     
