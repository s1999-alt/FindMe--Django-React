from django.db import models


class Category(models.Model):
  category_name = models.CharField( max_length=50)
  is_available = models.BooleanField(default=True)
  soft_deleted = models.BooleanField(default=True)
  category_image = models.ImageField(upload_to='category_images/', blank=True, null=True)

  def __str__(self):
    return self.category_name
  

class Packages(models.Model):
  package_name = models.CharField(max_length=50)
  duration = models.CharField(max_length=50)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  sale_price = models.DecimalField(max_digits=10, decimal_places=2)
  overview = models.TextField()
  category = models.ForeignKey(Category,on_delete=models.CASCADE)
  image = models.ImageField(upload_to='package_images/', blank=True, null=True)
  city = models.CharField(max_length=50)
  rating = models.DecimalField(max_digits=5, decimal_places=2)
  is_active = models.BooleanField(default=False)


  def __str__(self):
    return self.package_name
  
  
class PackageImages(models.Model):
  package = models.ForeignKey(Packages, on_delete=models.CASCADE , related_name = "images") 
  image = models.ImageField(upload_to="package_images/", default="", null=True, blank=True)

