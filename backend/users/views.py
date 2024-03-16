from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from Admin_Side.serializers import PackageSerializer,ItinararySerializer,BookingSerializer,WalletSerializer
from rest_framework import generics
from Admin_Side.models import Packages,Itinarary,Booking,Wallet



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



class WalletView(generics.RetrieveAPIView):
    queryset=Wallet.objects.all()
    serializer_class = WalletSerializer





    





