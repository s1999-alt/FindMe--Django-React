"""
Django settings for FindMe project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path
import environ
from datetime import timedelta

env = environ.Env(DEBUG=(bool, False))
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_path = BASE_DIR / '.env'
environ.Env.read_env(BASE_DIR / ".env")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://findme.siyadsavad.online",
    "https://master.d1flc43qrqfub1.amplifyapp.com",
]


# Application definition

INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'rest_framework.authtoken',
    'djoser',
    'rest_framework_simplejwt',
    'users',
    'Admin_Side',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'FindMe.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'FindMe.wsgi.application'
ASGI_APPLICATION = 'FindMe.asgi.application'


CHANNEL_LAYERS = {
  "default": {
    "BACKEND":"channels_redis.core.RedisChannelLayer",
    "CONFIG":{"hosts": [("127.0.0.1", 6379)]},
  }
}


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME':env("NAME"),
        'USER':env("USER") ,
        'PASSWORD':env("PASSWORD"),
        'HOST': 'localhost',
        'PORT': '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/


STATIC_ROOT = BASE_DIR / 'static'
STATIC_URL = 'static/'

CSRF_COOKIE_SECURE = True

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ]
}

PUBLIC_KEY = 'pk_test_51Or2HPSDdBPTenO6Kbxnw5ZPMlXL025WsUoySyl9ZUUGL0JQD7lokolYzSLGkokDZIkmNYiQOU1r7XNrTHTg3ubI00w28eowml'
STRIPE_SECRET_KEY = 'sk_test_51Or2HPSDdBPTenO66DJMmHH5aI7nUFdIguYQrxBDYYbvsEqutPQOP0rkht9sX10FQTKZ7MRqC1gRIzWAGQxivqjE00iiW4MOMX'
SITE_URL = 'https://findme.siyadsavad.online'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'users.User'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


SIMPLE_JWT = {
  'AUTH_HEADER_TYPES': (
    'Bearer',
    'JWT'),
  "ACCESS_TOKEN_LIFETIME": timedelta(minutes=120),
  "REFRESH_TOKEN_LIFETIME": timedelta(days=60),
  "SIGNING_KEY": env("SIGNING_KEY"),
  "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
  "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}


DJOSER = {
  'LOGIN_FIELD': 'email',
  'USER_CREATE_PASSWORD_RETYPE' : True,
  'USERNAME_CHANGED_EMAIL_CONFIRMATION' : True,
  'PASSWORD_CHANGED_EMAIL_CONFIRMATION' : True,
  'SEND_CONFIRMATION_EMAIL' : True,
  'PASSWORD_RESET_CONFIRM_URL' : 'password/reset/{uid}/{token}',
  'SET_PASSWORD_RETYPE' : True,
  'PASSWORD_RESET_CONFIRM_RETYPE' : True,
  'USERNAME_RESET_CONFIRM_URL' : 'username/reset/{uid}/{token}',
  'ACTIVATION_URL' : 'activate/{uid}/{token}',
  'SEND_ACTIVATION_EMAIL' : True,
  'SERIALIZERS' : {
    'user_create': 'users.serializers.CreateUserSerializer',
    'user': 'users.serializers.CreateUserSerializer',
    'user_delete': 'djoser.serializers.UserDeleteSerializer',
  },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = True
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = "findme112024@gmail.com"
DOMAIN = env("DOMAIN")
SITE_NAME = 'FindMe'


