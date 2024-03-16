from django.contrib import admin
from .models import Category, Packages, PackageImages, Hotels, Inclusions, Exclusions,Itinarary,Booking,Wallet


admin.site.register(Category)
admin.site.register(Packages)
admin.site.register(PackageImages)
admin.site.register(Hotels)
admin.site.register(Inclusions)
admin.site.register(Exclusions)
admin.site.register(Itinarary)
admin.site.register(Booking)
admin.site.register(Wallet)

