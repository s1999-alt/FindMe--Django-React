# Generated by Django 5.0.1 on 2024-03-19 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0020_alter_booking_payment_method'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='booking_number',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]
