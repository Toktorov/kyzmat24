# Generated by Django 4.0.4 on 2022-06-19 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_alter_media_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='status_user',
            field=models.CharField(choices=[('Free', 'Free'), ('Usually', 'Usually'), ('Pro', 'Pro')], default='Free', max_length=20),
        ),
    ]
