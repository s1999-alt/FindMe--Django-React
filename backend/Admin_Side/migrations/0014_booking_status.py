# Generated by Django 5.0.1 on 2024-03-02 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0013_alter_booking_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='status',
            field=models.CharField(choices=[('Pending Payment', 'Pending Payment'), ('Payment Complete', 'Payment Complete')], default='Pending Payment', max_length=50),
        ),
    ]
