# Generated by Django 5.0.1 on 2024-03-07 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0014_booking_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
