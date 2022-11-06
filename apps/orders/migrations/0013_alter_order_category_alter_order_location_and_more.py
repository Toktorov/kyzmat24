# Generated by Django 4.0.4 on 2022-10-28 09:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('categories', '0001_initial'),
        ('orders', '0012_alter_order_category_alter_order_location_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product_category', to='categories.category'),
        ),
        migrations.AlterField(
            model_name='order',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='categories.location'),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_user', to=settings.AUTH_USER_MODEL),
        ),
    ]