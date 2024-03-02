from django.urls import path
from .views import PackageListView,packageDetailView,ItineraryListView,ItineraryDetailView,BookingListView,BookingDetailView

urlpatterns = [
    path('packages/',PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>',packageDetailView.as_view(), name='package-detail'),

    path('itinararies/',ItineraryListView.as_view(), name='itinarary-list'), 
    path('itinararies/<int:pk>',ItineraryDetailView.as_view(), name='itinarary-details'),

    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/<int:pk>', BookingDetailView.as_view(), name='booking-detail') 
]