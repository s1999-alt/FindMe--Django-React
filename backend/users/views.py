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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        if 'status' in data and 'booking_status' in data:
            instance.status = data['status']
            instance.booking_status = data['booking_status']
            instance.save()
            return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Missing status or booking_status in request data'}, status=status.HTTP_400_BAD_REQUEST)


class BookingDataView(generics.ListAPIView):
    serializer_class = BookingSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Booking.objects.filter(user_id=user_id)



class WalletView(generics.RetrieveAPIView):
    queryset=Wallet.objects.all()
    serializer_class = WalletSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        if 'balance' in data:
            instance.balance = data['balance']
            instance.save()
            return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Missing balance in request data'}, status=status.HTTP_400_BAD_REQUEST)





    





