# Generated by Django 4.0.4 on 2022-05-21 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_remove_contact_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='src',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='media',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='media_files/'),
        ),
        migrations.AlterField(
            model_name='media',
            name='src',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]