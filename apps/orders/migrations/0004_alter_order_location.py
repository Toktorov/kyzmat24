# Generated by Django 3.2.7 on 2022-04-09 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0002_location'),
        ('orders', '0003_auto_20220404_1008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='location',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='categories.location'),
            preserve_default=False,
        ),
    ]