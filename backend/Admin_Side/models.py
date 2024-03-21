from django.db import models
from users.models import User
from datetime import timedelta
import uuid
from django.utils import timezone

class Category(models.Model):
  category_name = models.CharField( max_length=50, unique=True )
  is_available = models.BooleanField(default=True)
  soft_deleted = models.BooleanField(default=False)
  category_image = models.ImageField(upload_to='category_images/', blank=True, null=True)

  def __str__(self):
    return self.category_name
  

class Inclusions(models.Model):
  inclusion = models.CharField(max_length=100) 

  def __str__(self):
    return self.inclusion 
  
  
class Exclusions(models.Model):
  exclusion = models.CharField(max_length=100) 

  def __str__(self):
    return self.exclusion
  

class Hotels(models.Model):
  hotel_name = models.CharField(max_length=50)
  place = models.CharField(max_length=50)
  hotel_overview = models.TextField()
  hotel_image = models.ImageField(upload_to="hotel_images/",default="",null=True,blank=True)
  is_available = models.BooleanField(default=True)

  def __str__(self):
    return self.hotel_name    
  

class Packages(models.Model):
  package_name = models.CharField(max_length=50, unique=True)
  duration = models.CharField(max_length=50)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  sale_price = models.DecimalField(max_digits=10, decimal_places=2)
  overview = models.TextField()
  category = models.ForeignKey(Category,on_delete=models.CASCADE)
  image = models.ImageField(upload_to='package_images/', blank=True, null=True)
  city = models.CharField(max_length=50)
  rating = models.DecimalField(max_digits=5, decimal_places=2)
  inclusions = models.ManyToManyField(Inclusions, blank=True)
  exclusions = models.ManyToManyField(Exclusions, blank=True)
  hotels = models.ManyToManyField(Hotels, blank=True)
  is_active = models.BooleanField(default=False)


  def __str__(self):
    return self.package_name
  

class PackageImages(models.Model):
  package = models.ForeignKey(Packages, on_delete=models.CASCADE , related_name = "images") 
  image = models.ImageField(upload_to="package_images/", default="", null=True, blank=True)


class Itinarary(models.Model):
  package = models.ForeignKey(Packages, on_delete=models.CASCADE)
  day_number = models.PositiveIntegerField()
  activities = models.TextField()

  def __str__(self):
    return f"{self.package.package_name} - Day {self.day_number}"
  

class Wallet(models.Model):
  user = models.OneToOneField(User,on_delete=models.CASCADE)
  balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  is_active = models.BooleanField(default=True)

  def __str__(self):
      return f"Wallet of {self.user.first_name}"
  
  

class Booking(models.Model):
  PAYMENT_STATUS_CHOICES = [
    ('Pending Payment', 'Pending Payment'),
    ('Payment Complete', 'Payment Complete'),
    ('Returned', 'Returned')  
  ]

  PAYMENT_METHOD_CHOICES = [
    ('Stripe', 'Stripe'),
    ('Wallet','Wallet'),
    ('Not-paid','Not-paid')
  ]

  BOOKING_STATUS_CHOICES = [
    ('Upcoming' , 'Upcoming'),
    ('Ongoing' , 'Ongoing'),
    ('Completed' , 'Completed'),
    ('Cancelled' , 'Cancelled'),
  ]

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  package = models.ForeignKey(Packages,on_delete=models.CASCADE)
  full_name = models.CharField(max_length=255)
  phone = models.CharField(max_length=15)
  email = models.EmailField(max_length=254)
  start_date = models.DateField()
  end_date = models.DateField(null=True)
  no_of_guest = models.PositiveIntegerField()
  total = models.DecimalField(max_digits=10, decimal_places=2)
  status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES , default='Pending Payment')
  payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='Not-paid')
  booking_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
  booking_status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='Upcoming')
  

  def __str__(self):
    return f"{self.full_name} - {self.package.package_name}"
  
  def save(self, *args, **kwargs):
    if not self.booking_number:
      self.booking_number = self.generate_booking_number()
    package_duration = int(self.package.duration)
    end_date = self.start_date + timedelta(days=package_duration)
    self.end_date = end_date
    now = timezone.now().date()
    if self.start_date > now:
      self.booking_status = 'Upcoming'
    elif self.start_date <= now <=self.end_date:
      self.status = 'Ongoing'
    elif now > self.end_date:
      self.status = 'Completed'    

    super().save(*args, **kwargs)

  def generate_booking_number(self):
      unique_id = uuid.uuid4().hex[:6].upper()  
      return f'BOOK-{unique_id}'    
  







 

