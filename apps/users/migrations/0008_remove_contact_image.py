# Generated by Django 4.0.4 on 2022-05-21 03:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_rename_image_media_file_alter_user_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='image',
        ),
    ]
