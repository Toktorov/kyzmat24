from django.db import models
from apps.categories.models import Category, Location
from apps.users.models import User

# Create your models here.
class Order(models.Model):
    title = models.CharField(max_length=250, help_text = "Название продукта")
    description = models.TextField(help_text="Описание продукта")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    places = models.CharField(max_length=100, help_text="places", blank = True, null = True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,  related_name='product_category', blank = True, null = True)
    imgsrc = models.ImageField(upload_to = 'product_image', help_text = "Фотография продукта")
    email = models.CharField(max_length=100, help_text="Почта", blank = True, null = True)
    tel = models.CharField(max_length=100, help_text="Телефоный номер")
    cretated = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True, blank=True, null = True)
    
    def __str__(self):
        return self.description 

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
        ordering = ('-id',)

class AcceptOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Принимать заказ"
        verbose_name_plural = "Принимать заказы"