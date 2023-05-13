from django.db import models

# Create your models here.
class Setting(models.Model):
    title = models.CharField(
        max_length=100,
        verbose_name="Название"
    )
    description = models.CharField(
        max_length=255,
        verbose_name="Описание",
        blank=True, null=True
    )
    logo = models.ImageField(
        upload_to='logos/',
        verbose_name="Лого",
        blank=True, null=True
    )
    tel = models.CharField(
        max_length=100,
        verbose_name="Телефонный номер",
        blank=True, null=True
    )

    def __str__(self):
        return self.title 
    
    class Meta:
        verbose_name = "Настройка"
        verbose_name_plural = "Настройки"

class AboutUs(models.Model):
    title = models.CharField(
        max_length=100,
        verbose_name="Название"
    )
    description = models.TextField(
        verbose_name="Описание",
        blank=True, null=True
    )
    image = models.ImageField(
        upload_to='about_images/',
        verbose_name="Лого",
        blank=True, null=True
    )

    def __str__(self):
        return self.title 
    
    class Meta:
        verbose_name = "О нас"
        verbose_name_plural = "О нас"