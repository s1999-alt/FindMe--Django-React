# Generated by Django 5.0.1 on 2024-02-12 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='soft_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
