# Generated by Django 5.0.1 on 2024-03-20 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0021_booking_booking_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='booking_status',
            field=models.CharField(choices=[('Upcoming', 'Upcoming'), ('Ongoing', 'Ongoing'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default='Upcoming', max_length=20),
        ),
    ]
