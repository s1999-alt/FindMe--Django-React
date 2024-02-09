from django.urls import path
from .views import PackageListView,packageDetailView,PackageCreateView

urlpatterns = [
    path('packages/',PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>',packageDetailView.as_view(), name='package-detail'),
    path('packages/create/', PackageCreateView.as_view(), name='package-create'),
]