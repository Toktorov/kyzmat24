# Generated by Django 4.0.4 on 2023-05-13 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AboutUs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('image', models.ImageField(blank=True, null=True, upload_to='about_images/', verbose_name='Лого')),
            ],
            options={
                'verbose_name': 'О нас',
                'verbose_name_plural': 'О нас',
            },
        ),
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('description', models.CharField(blank=True, max_length=255, null=True, verbose_name='Описание')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='logos/', verbose_name='Лого')),
                ('tel', models.CharField(blank=True, max_length=100, null=True, verbose_name='Телефонный номер')),
            ],
            options={
                'verbose_name': 'Настройка',
                'verbose_name_plural': 'Настройки',
            },
        ),
    ]