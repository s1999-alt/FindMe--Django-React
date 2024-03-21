# Generated by Django 5.0.1 on 2024-03-20 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0022_booking_booking_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='status',
            field=models.CharField(choices=[('Pending Payment', 'Pending Payment'), ('Payment Complete', 'Payment Complete'), ('Returned', 'Returned')], default='Pending Payment', max_length=50),
        ),
    ]
