from tabnanny import verbose
from django.db import models
from django.db.models.signals import pre_save
from utils.slug_generator import unique_slug_generators

# Create your models here.
class Category(models.Model):
    content = models.CharField(
        max_length=255,
        verbose_name='Наименование'
    )
    

    def __str__(self):
        return f"{self.content}"

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

class CategoryImage(models.Model):
    image = models.ImageField(
        upload_to='category',
        verbose_name='Картинки',
        blank=True, null=True
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE,
        related_name='category_image'
    )

    def __str__(self):
        return f"{self.id}"


    class Meta:
        verbose_name = 'Изображение продукта'
        verbose_name_plural = 'Изображении продуктов'
        ordering = ('-id',)

class Location(models.Model):
    title = models.CharField(max_length=255)
    location_self = models.ForeignKey('self', on_delete=models.SET_NULL, null = True, blank = True)

    def __str__(self):
        return self.title 

    class Meta:
        verbose_name = "Локация"
        verbose_name_plural = "Локации"