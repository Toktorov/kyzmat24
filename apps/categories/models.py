from django.db import models
from django.db.models.signals import pre_save
from utils.slug_generator import unique_slug_generators

# Create your models here.
class Category(models.Model):
    content = models.CharField(
        max_length=255,
        verbose_name='Наименование'
    )
    
    value = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return f"{self.content} -- {self.value}"

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


def slag_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.value:
        instance.value = unique_slug_generators(instance)


pre_save.connect(slag_pre_save_receiver, sender=Category)