# Generated by Django 4.0.4 on 2022-05-17 16:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_phoneotp_remove_user_phonenumber_user_phone_number_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PhoneOtp',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_verified',
        ),
        migrations.AddField(
            model_name='user',
            name='phonenumber',
            field=models.CharField(blank=True, max_length=255, null=True, validators=[django.core.validators.RegexValidator(message='You should write +996[code][number]', regex='^(\\+996)\\d{9}$')]),
        ),
    ]
