from django.db import models
from apps.categories.models import Category

# Create your models here.
class Order(models.Model):
    title = models.CharField(max_length=250, help_text = "Название продукта")
    description = models.TextField(help_text="Описание продукта")
    location = models.CharField(max_length=100, help_text="Место продажи", blank = True, null = True)
    places = models.CharField(max_length=100, help_text="places", blank = True, null = True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,  related_name='product_category', blank = True, null = True)
    imgsrc = models.ImageField(upload_to = 'product_image', help_text = "Фотография продукта")
    email = models.CharField(max_length=100, help_text="Почта", blank = True, null = True)
    tel = models.CharField(max_length=100, help_text="Телефоный номер")
    cretated = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title 

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ('-id',)
        
class Contact(models.Model):
    name = models.CharField(max_length = 100)
    src = models.CharField(max_length = 250)
    product = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.name 

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"
        
class Media(models.Model):
    name = models.CharField(max_length = 100, verbose_name="Имя")
    src = models.CharField(max_length = 250)
    product = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.name 

    class Meta:
        verbose_name = "Медиа"
        verbose_name_plural = "Медиа"