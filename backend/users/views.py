from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework import permissions
from Admin_Side.serializers import PackageSerializer,ItinararySerializer,BookingSerializer,WalletSerializer
from rest_framework import generics
from Admin_Side.models import Packages,Itinarary,Booking,Wallet
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



class BookingListView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer  

class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingDataView(generics.ListAPIView):
    serializer_class = BookingSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Booking.objects.filter(user_id=user_id)
      
    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)  



class WalletView(generics.RetrieveAPIView):
    queryset=Wallet.objects.all()
    serializer_class = WalletSerializer





    





