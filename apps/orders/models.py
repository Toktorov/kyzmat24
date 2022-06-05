from django.db import models
from apps.categories.models import Category, Location
from apps.users.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Order(models.Model):
    title = models.CharField(max_length=250, help_text = "Название продукта", blank=True, null = True)
    description = models.TextField(help_text="Описание продукта", blank=True, null = True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, blank=True, null = True)
    places = models.CharField(max_length=100, help_text="places", blank = True, null = True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,  related_name='product_category', blank = True, null = True)
    order_image = models.FileField(upload_to = 'order_image/')
    imgsrc = models.FileField(upload_to = 'product_image', help_text = "Фотография продукта")
    email = models.CharField(max_length=100, help_text="Почта", blank = True, null = True)
    tel = models.CharField(max_length=100, help_text="Телефоный номер", blank=True, null = True)
    cretated = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(
        _("status"),
        default=False,
        help_text=_("Status Product"),
    )
    completed = models.BooleanField(
        default=False, help_text="Статус заказа"
    )
    
    def __str__(self):
        return f"{self.title}, {self.description}, {self.cretated}"

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
        ordering = ('-id',)

class AcceptOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.OneToOneField(Order, limit_choices_to = {'status': False}, on_delete=models.CASCADE, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.order)

    class Meta:
        verbose_name = "Принимать заказ"
        verbose_name_plural = "Принимать заказы"