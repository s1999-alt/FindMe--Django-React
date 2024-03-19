# Generated by Django 5.0.1 on 2024-03-17 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_Side', '0017_wallet'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='payment_method',
            field=models.CharField(choices=[('Stripe', 'Stripe'), ('Wallet', 'Wallet')], default='Not paid', max_length=20),
        ),
    ]