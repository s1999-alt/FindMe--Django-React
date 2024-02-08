from django.contrib import admin
from .models import Category, Packages, PackageImages


admin.site.register(Category)
admin.site.register(Packages)
admin.site.register(PackageImages)

