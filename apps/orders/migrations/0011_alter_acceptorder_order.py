# Generated by Django 3.2.7 on 2022-04-26 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_alter_acceptorder_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acceptorder',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='accept_user', to='orders.order'),
        ),
    ]