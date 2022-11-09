from django.db import models

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

class Location(models.Model):
    title = models.CharField(max_length=255)
    location_self = models.ForeignKey('self', on_delete=models.CASCADE, null = True, blank = True)

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name = "Локация"
        verbose_name_plural = "Локации"