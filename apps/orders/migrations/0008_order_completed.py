# Generated by Django 4.0.4 on 2022-06-05 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_alter_order_imgsrc_alter_order_order_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='completed',
            field=models.BooleanField(default=False, help_text='Статус заказа'),
        ),
    ]
