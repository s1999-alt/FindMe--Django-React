from django.contrib import admin
from .models import Category, Packages, PackageImages, Hotels


admin.site.register(Category)
admin.site.register(Packages)
admin.site.register(PackageImages)
admin.site.register(Hotels)

