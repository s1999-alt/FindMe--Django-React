from django.urls import path
from .views import AdminLoginView,UserListView,UserActiveView,CategoryListView,AdminPackageListView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('logout/', AdminLoginView.as_view(), name='admin-logout'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('block/<int:id>', UserActiveView.as_view(), name='user-block'),

    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('packages/', AdminPackageListView.as_view(), name='admin-packagelist'),

]