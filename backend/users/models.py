from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager



class User(AbstractBaseUser, PermissionsMixin):
  first_name = models.CharField(_("First_name"), max_length=50)
  last_name = models.CharField(_("Last_name"), max_length=50)
  email = models.EmailField(_("Email Address"), max_length=254, unique = True)
  phone = models.CharField(_("Phone"), max_length=15)
  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=False)
  date_joined = models.DateTimeField(auto_now_add=True)
  is_online = models.BooleanField(default=False)


  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["first_name","last_name"]
  

  objects = CustomUserManager()

  class Meta:
    verbose_name = _("User")
    verbose_name_plural = _("Users")

  def __str__(self):
    return self.email

  @property
  def get_full_name(self):
    return f"{self.first_name} {self.last_name}"