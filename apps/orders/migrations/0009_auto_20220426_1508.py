# Generated by Django 3.2.7 on 2022-04-26 09:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0003_remove_category_value'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0008_alter_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acceptorder',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accept_user', to='orders.order'),
        ),
        migrations.AlterField(
            model_name='acceptorder',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accept_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='description',
            field=models.TextField(blank=True, help_text='Описание продукта', null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.location'),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='tel',
            field=models.CharField(blank=True, help_text='Телефоный номер', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='title',
            field=models.CharField(blank=True, help_text='Название продукта', max_length=250, null=True),
        ),
    ]