# Generated by Django 4.0.4 on 2022-05-18 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_user_phonenumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='image',
            field=models.ImageField(default=1, upload_to='contact_image/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='media',
            name='image',
            field=models.FileField(default=1, upload_to='media_files/'),
            preserve_default=False,
        ),
    ]
