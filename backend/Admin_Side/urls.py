from django.urls import path
from .views import AdminLoginView,UserListView,UserActiveView,CategoryListView,AdminPackageListView,PackageCreateView,PackageUpdateView,PackageBlockUnblockView,CategoryUpdateView,CategoryCreateView,CategoryDetails,AdminHotelCreateView,AdminHotelListView,AdminHotelView,StripeCheckoutView,StripeSuccessView,ResetPasswordView,PasswordResetView,AdminUserDetailsView,BookingListView,ItineraryCreateView,ItineraryListView,UniqueUserListView,GoogleAuth

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('logout/', AdminLoginView.as_view(), name='admin-logout'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('block/<int:id>', UserActiveView.as_view(), name='user-block'),

    path('user-details/<int:id>', AdminUserDetailsView.as_view(), name='admin-user-details'),

    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('password-reset/<str:uidb64>/<str:token>/', PasswordResetView.as_view(), name='password-reset'),

    
    path('packages/', AdminPackageListView.as_view(), name='admin-packagelist'),
    path('packages/create/', PackageCreateView.as_view(), name='package-create'),
    path('packages/update/<int:pk>',PackageUpdateView.as_view(),name='package-update'),
    path('packages/block/<int:pk>/',PackageBlockUnblockView.as_view(),name='package-block-unblock'),


    path('itineraries/create/', ItineraryCreateView.as_view(), name='itinerary-create'),
    path('itineraries/', ItineraryListView.as_view(), name='itinerary-list'),


    path('categories/', CategoryCreateView.as_view(), name='category-create'),
    path('categories/list/', CategoryListView.as_view(), name='category-list'),
    path('categories/block/<int:pk>/', CategoryUpdateView.as_view(), name='category-block-unblock'),
    path('categories/<int:pk>', CategoryDetails.as_view(), name='category-details'),
    path('categories/update/<int:pk>', CategoryDetails.as_view(), name='category-update'),

    path('hotels/create/', AdminHotelCreateView.as_view(), name='hotels-create'),
    path('hotels/list/', AdminHotelListView.as_view(), name='hotels-list'),
    path('hotels/list/<int:pk>/', AdminHotelView.as_view(), name='hotels-list'),

    path('create-checkout-session/',StripeCheckoutView.as_view(), name='create-checkout-session'),
    path('stripe-success/', StripeSuccessView.as_view(), name='stripe-success'),

    path('bookings/', BookingListView.as_view(), name='booking-list'),

    path('chat-unique-users/', UniqueUserListView.as_view(), name='unique-users'),

    path('google-auth/', GoogleAuth.as_view(), name='google-auth'),

]