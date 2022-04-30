# Generated by Django 3.2.7 on 2022-04-28 06:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0015_alter_acceptorder_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acceptorder',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='accept_user', to='orders.order'),
        ),
    ]