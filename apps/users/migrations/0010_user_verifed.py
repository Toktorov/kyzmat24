# Generated by Django 4.0.4 on 2022-05-31 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_contact_src_alter_media_file_alter_media_src'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verifed',
            field=models.BooleanField(default=False, verbose_name='Верифицирован'),
        ),
    ]