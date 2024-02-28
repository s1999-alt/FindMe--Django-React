from django.urls import path
from .views import PackageListView,packageDetailView,ItineraryListView,ItineraryDetailView

urlpatterns = [
    path('packages/',PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>',packageDetailView.as_view(), name='package-detail'),

    path('itinararies/',ItineraryListView.as_view(), name='itinarary-list'), 
    path('itinararies/<int:pk>',ItineraryDetailView.as_view(), name='itinarary-details'), 
]